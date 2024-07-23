// import axios from "axios";

// const instance = axios.create({
//     baseURL: "http://58.239.9.235:8089/api"
// });

// export default instance;

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gmietzyffvmfluiotbgo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtaWV0enlmZnZtZmx1aW90YmdvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzNjA2NzAsImV4cCI6MjAzNTkzNjY3MH0.b9ymNNXpYe8PbN-Ci5V7G8pZScVTGk4knO58lI16B1I';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
