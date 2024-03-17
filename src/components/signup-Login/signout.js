
const auth = getAuth(app);
signOut(auth).then(() => {
  // Sign-out successful.
  console.log('Sign-out successful.');
}).catch((error) => {
  // An error happened.
  console.error('An error happened during sign-out.', error.message);
});