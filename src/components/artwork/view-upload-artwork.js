import { getFirestore, collection, query, doc, deleteDoc, where, getDocs } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase-setup';

async function fetchAndDisplayArtworks(userId) {
  const db = getFirestore(app);
  const artworksCollectionRef = collection(db, 'users', userId, 'artworks');
  const querySnapshot = await getDocs(artworksCollectionRef);

  const artworksTableBody = document.getElementById('artworkTableBody');

  // Clear the table body to ensure it's empty before inserting new rows
  artworksTableBody.innerHTML = '';

  // Check if there are any artworks
  if (querySnapshot.empty) {
    const row = document.createElement('tr');
    row.innerHTML = `<td colspan="7"><h1 class="text-center">No artwork has been uploaded yet.</h1></td>`;
    artworksTableBody.appendChild(row);
  } else {
    querySnapshot.forEach(doc => {
      const artwork = doc.data();
      const row = document.createElement('tr');
      row.innerHTML = `
        <td></td> <!-- Placeholder for any leading cells -->
        <td>${artwork.name}</td>
        <td>${artwork.type}</td>
        <td>${artwork.description}</td>
        <td>${artwork.creationDate}</td>
        <td><a href="${artwork.imageUrl}" target="_blank">View</a></td>
        <td>
            <button type="button" class="btn btn-danger btn-sm px-3" onclick="deleteArtwork('${doc.id}')">
                <i class="bi bi-trash"></i>
            </button>
        </td>
      `;
      artworksTableBody.appendChild(row);
    });
  }
}

async function deleteArtwork(artworkId, userId) {
  // Show the confirmation modal
  const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
  confirmDeleteModal.show();

  // Handle confirmation button click
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const cancelDeleteBtn = document.getElementById('CancelDeleteBtn');
  const closeBtnConfirm = document.getElementById('closeBtnConfirm');

  // Remove existing event listeners
  confirmDeleteBtn.replaceWith(confirmDeleteBtn.cloneNode(true));
  cancelDeleteBtn.replaceWith(cancelDeleteBtn.cloneNode(true));
  closeBtnConfirm.replaceWith(closeBtnConfirm.cloneNode(true));

  // Reassign variables to the new elements
  const newConfirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const newCancelDeleteBtn = document.getElementById('CancelDeleteBtn');
  const newCloseBtnConfirm = document.getElementById('closeBtnConfirm');

  newConfirmDeleteBtn.addEventListener('click', async () => {
    const db = getFirestore(app);
    try {
      // Specify the path to the artwork document
      const artworkRef = doc(db, 'users', userId, 'artworks', artworkId);
      // Delete the document
      await deleteDoc(artworkRef);
      // Remove the artwork row from the table or refresh the list
      fetchAndDisplayArtworks(userId);
      alert("Artwork has been deleted successfully.");
    } catch (error) {
      console.error('Error deleting artwork:', error);
    } finally {
      // Hide the confirmation modal
      confirmDeleteModal.hide();
    }
  }, { once: true });

  // Handle cancel button click
  newCancelDeleteBtn.addEventListener('click', () => {
    confirmDeleteModal.hide();
  }, { once: true });

  // Handle close button click
  newCloseBtnConfirm.addEventListener('click', () => {
    confirmDeleteModal.hide();
  }, { once: true });
}

// Set up the auth state observer and fetch artworks when a user is signed in
onAuthStateChanged(getAuth(app), (user) => {
  if (user) {
    fetchAndDisplayArtworks(user.uid);
    window.deleteArtwork = (artworkId) => deleteArtwork(artworkId, user.uid); // Expose the function to the window object for use in onclick
  } else {
    console.error('No user is signed in.');
  }
});
