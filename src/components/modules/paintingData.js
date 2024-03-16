// Assuming Firebase is initialized in firebase-setup.js
import {
  getFirestore,
  query,
  collectionGroup,
  getDocs,
  doc, 
  getDoc 
} from "firebase/firestore";
import { app } from "../firebase-setup";

const db = getFirestore(app);
const DEFAULT_IMAGE_URL = "../../../assets/images/noArtwork.jpg";
const DEFAULT_ARTWORK_DETAILS = {
  uid:"N/A",
  name: "N/A",
  artist:"N/A",
  artworktype: "N/A",
  description: "N/A",
  imageUrl: DEFAULT_IMAGE_URL,
  releaseDate:"N/A"};
async function getArtworksWithDetails() {
  const artworksQuery = query(collectionGroup(db, "artworks"));
  const querySnapshot = await getDocs(artworksQuery);

  const artworksAndDetails = [];

  for (const doc of querySnapshot.docs) { 
    const userId = doc.ref.path.split('/')[1];
    const artworkData = doc.data(); // Ensure artworkData is defined here
    const artistFullName = await fetchUserData(userId);

    // Check if artworkData has imageUrl before proceeding
    if (artworkData.imageUrl) {
      artworksAndDetails.push({
        uid: userId || "N/A",
        name: artworkData.name || "N/A", 
        artist: artistFullName || "Unknown Artist", 
        description: artworkData.description || "N/A",
        artworktype: artworkData.type || "N/A",
        releaseDate: artworkData.date || "N/A",

        imageUrl: artworkData.imageUrl,
      });
    }
  };

  // If there are fewer than 24 artworks, fill the rest with default values
  for (let i = artworksAndDetails.length; i < 24; i++) {
    artworksAndDetails.push({
      userId: "N/A",
      ...DEFAULT_ARTWORK_DETAILS,
    });
  }
console.log(artworksAndDetails);
  // Now, artworksAndDetails contains at least 24 elements
  return artworksAndDetails;
}





//defualt position of artwork in relation to the walls of gallery location.
//rotation is for angel of veiw baseed on artwork.
//lenght is the number of artworks display in a single wall for the loop to itegrate
const positionsAndRotations = [
  // Front Wall
  ...Array.from({ length: 6 }, (_, i) => ({
    x: -26 + 10 * i,
    y: 2,
    z: -34.5,
    rotationY: 0,
  })),
  // Back Wall
  ...Array.from({ length: 6 }, (_, i) => ({
    x: -25 + 10 * i,
    y: 2,
    z: 34.5,
    rotationY: Math.PI,
  })),
  // Left Wall
  ...Array.from({ length: 6 }, (_, i) => ({
    x: -34.6,
    y: 2,
    z: -22 + 10 * i,
    rotationY: Math.PI / 2,
  })),
  // Right Wall
  ...Array.from({ length: 6 }, (_, i) => ({
    x: 33.5,
    y: 2,
    z: -23 + 10 * i,
    rotationY: -Math.PI / 2,
  })),
];

export async function fetchAndPreparePaintingData() {
  const artworksAndDetails = await getArtworksWithDetails();
  const paintingData = artworksAndDetails.map((artwork, index) => {
    const position = positionsAndRotations[index] || { x: 0, y: 0, z: 0, rotationY: 0 }; // Default value
    return {
      imgSrc: artwork.imageUrl || DEFAULT_IMAGE_URL,
      width: 6,
      height: 4,
      position: { x: position.x, y: position.y, z: position.z },
      rotationY: position.rotationY,
      info: {
        title: artwork.name || "N/A",
        artist: artwork.artist || "N/A",
        description: artwork.description || "N/A",
        artworktype:artwork.artworktype,
        releaseDate: artwork.year || "N/A",
        uid: artwork.uid || "",
      },
    };
  });

  return paintingData;
}


async function fetchUserData(userId) {
  let fullName = "";
  const userRef = doc(db, "users", userId); // Use 'doc' from 'firebase/firestore'
  try {
    const docSnap = await getDoc(userRef); // Use 'getDoc' from 'firebase/firestore'
    if (docSnap.exists()) {
      const userData = docSnap.data();
      fullName = `${userData.firstName || "N/A"} ${userData.lastName || "."}`;

    } else {
      fullName = "Unknown Artist";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    fullName = "Unknown Artist";
  }
  return fullName;
}
