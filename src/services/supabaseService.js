import supabase from '../api/instance';

function generateRandomCode(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

// 이벤트 생성
export const saveEvent = async (title, time, imageIndex) => {
    const event_code = generateRandomCode();

    const { data, error } = await supabase
        .from('event_tb')
        .insert([{ title, time, imageIndex, event_code }])
        .select();

    if (error) {
        console.error('Error saving event:', error);
        throw error;
    }
    console.log('Save Event Data:', data);
    return data;
};

// 이벤트 수정
export const editEvent = async (eventCode, title, time, imageIndex) => {
    const { data, error } = await supabase
        .from('event_tb')
        .update({ title, time, imageIndex }) // imageIndex 추가
        .eq('event_code', eventCode)
        .select();

    if (error) {
        console.error('Error editing event:', error);
        throw error;
    }
    console.log('Edit Event Data:', data);
    return data;
};

// 이벤트 조회
export const getEvent = async (eventCode) => {
    const { data, error } = await supabase
        .from('event_tb')
        .select('*')
        .eq('event_code', eventCode);

    if (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
    console.log('Get Event Data:', data);
    return data;
};

// 참여 생성
export const saveParticipation = async (eventCode, name, checked, time) => {
    const { data, error } = await supabase
        .from('participation_tb')
        .insert([{ event_code: eventCode, name, checked, time }])
        .select();

    if (error) {
        console.error('Error saving participation:', error);
        throw error;
    }
    return data;
};

// 참여 업데이트
export const updateParticipation = async (name, checked, time) => {
    const { data, error } = await supabase
        .from('participation_tb')
        .update({ checked, time })
        .eq('name', name)
        .select();

    if (error) {
        console.error('Error updating participation:', error);
        throw error;
    }
    return data;
};

// 참여 조회
export const getParticipation = async (eventCode) => {
    const { data, error } = await supabase
        .from('participation_tb')
        .select(`
            *,
            event_tb (
                title
            )
        `)
        .eq('event_code', eventCode);

    if (error) {
        console.error('Error fetching participation:', error);
        throw error;
    }
    console.log('Get Participation Data:', data); // 데이터 확인 로그 추가
    return data;
};

// 참여자 이름 조회
export const getParticipationName = async (eventCode, name) => {
    const { data, error } = await supabase
        .from('participation_tb')
        .select('name')
        .eq('event_code', eventCode)
        .eq('name', name);

    if (error) {
        console.error('Error fetching participation name:', error);
        throw error;
    }
    return data;
};