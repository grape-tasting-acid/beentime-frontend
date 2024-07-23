import supabase from '../api/instance';

// 이벤트 생성
export const saveEvent = async (title, detail, time) => {
    const { data, error } = await supabase
        .from('event_tb')
        .insert([{ title, detail, time }])
        .select();

    if (error) {
        console.error('Error saving event:', error);
        throw error;
    }
    console.log('Save Event Data:', data);
    return data;
};

// 이벤트 수정
export const editEvent = async (eventId, title, detail, time) => {
    const { data, error } = await supabase
        .from('event_tb')
        .update({ title, detail, time })
        .eq('event_id', eventId)
        .select();

    if (error) {
        console.error('Error editing event:', error);
        throw error;
    }
    console.log('Edit Event Data:', data);
    return data;
};

// 이벤트 조회
export const getEvent = async (eventId) => {
    const { data, error } = await supabase
        .from('event_tb')
        .select('*')
        .eq('event_id', eventId);

    if (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
    console.log('Get Event Data:', data);
    return data;
};

// 참여 생성
export const saveParticipation = async (eventId, name, checked, memo, time) => {
    const { data, error } = await supabase
        .from('participation_tb')
        .insert([{ event_id: eventId, name, checked, memo, time }])
        .select();

    if (error) {
        console.error('Error saving participation:', error);
        throw error;
    }
    return data;
};

// 참여 업데이트
export const updateParticipation = async (name, checked, time, memo) => {
    const { data, error } = await supabase
        .from('participation_tb')
        .update({ checked, time, memo })
        .eq('name', name)
        .select();

    if (error) {
        console.error('Error updating participation:', error);
        throw error;
    }
    return data;
};

// 참여 조회
export const getParticipation = async (eventId) => {
    const { data, error } = await supabase
        .from('participation_tb')
        .select(`
            *,
            event_tb (
                title,
                detail
            )
        `)
        .eq('event_id', eventId);

    if (error) {
        console.error('Error fetching participation:', error);
        throw error;
    }
    console.log('Get Participation Data:', data); // 데이터 확인 로그 추가
    return data;
};

// 참여자 이름 조회
export const getParticipationName = async (eventId, name) => {
    const { data, error } = await supabase
        .from('participation_tb')
        .select('name')
        .eq('event_id', eventId)
        .eq('name', name);

    if (error) {
        console.error('Error fetching participation name:', error);
        throw error;
    }
    return data;
};
