const admin = require('firebase-admin');

// Replace with your Firebase Admin SDK service account key path
const serviceAccount = require('./path/to/your/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const updateAvatars = async () => {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    if (snapshot.empty) {
      console.log('No users found.');
      return;
    }

    const batch = db.batch();
    let updatedCount = 0;

    snapshot.forEach(doc => {
      const userData = doc.data();
      // Only update if avatar is not already set or is a default placeholder
      if (!userData.avatar || userData.avatar.includes('placeholder')) {
        const newAvatarUrl = `https://source.unsplash.com/random/150x150/?portrait,woman&${doc.id}`;
        batch.update(doc.ref, { avatar: newAvatarUrl });
        updatedCount++;
      }
    });

    if (updatedCount > 0) {
      await batch.commit();
      console.log(`Successfully updated avatars for ${updatedCount} users.`);
    } else {
      console.log('No avatars needed updating.');
    }

  } catch (error) {
    console.error('Error updating avatars:', error);
  }
};

updateAvatars();
