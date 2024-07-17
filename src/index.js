import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.scss';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

// Watch to set up supabase image upload and retrieval
// https://www.youtube.com/watch?v=8tfdY0Sf2rA&ab_channel=CooperCodes
const supabase = createClient(
  'https://gusnjhjnuugqaqtgwhym.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1c25qaGpudXVncWFxdGd3aHltIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA3NDc4OTIsImV4cCI6MjAzNjMyMzg5Mn0.z_he4L_QZkVO_SHIDKEqrgBVvhsa9AGKPeJ4dCSWPKU'
);

const clientId = `667696901990-v22rq6co1ap3p4mvl4h22bm4giu6fenm.apps.googleusercontent.com`; // Corrected clientId URL

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </GoogleOAuthProvider>
);
