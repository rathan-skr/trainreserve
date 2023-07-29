const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: "travelzara-8d93b.appspot.com",
  messagingSenderId: "379483541994",
  measurementId: "G-QYDPZL0NS7",
  persistence: "local",
};

export default firebaseConfig;
