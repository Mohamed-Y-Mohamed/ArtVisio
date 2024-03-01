const userData = {};

document.getElementById("userProfile-saveChange").addEventListener("click", function() {
    // Get user input data
    const firstName = document.getElementById("user-firstname").value.trim();
    const lastName = document.getElementById("user-lastname").value.trim();
    const email = document.getElementById("user-email").value.trim();
    const country = document.getElementById("user-country").value.trim();
    const dob = document.getElementById("user-DOB").value.trim();
    const biography = document.getElementById("user-Biography").value.trim();
    const websiteLink = document.getElementById("user-website-Link").value.trim();
    const twitterLink = document.getElementById("user-twitter-link").value.trim();
    const instagramLink = document.getElementById("user-instagram-link").value.trim();
    const facebookLink = document.getElementById("user-facebook-link").value.trim();
  
    // Check if any input field is empty
    if (!firstName || !lastName || !email || !country || !dob || !biography || !websiteLink || !twitterLink || !instagramLink || !facebookLink) {
      // Change border color of empty input fields to red
      if (!firstName) document.getElementById("user-firstname").style.borderColor = "red";
      if (!lastName) document.getElementById("user-lastname").style.borderColor = "red";
      if (!email) document.getElementById("user-email").style.borderColor = "red";
      if (!country) document.getElementById("user-country").style.borderColor = "red";
      if (!dob) document.getElementById("user-DOB").style.borderColor = "red";
      if (!biography) document.getElementById("user-Biography").style.borderColor = "red";
      if (!websiteLink) document.getElementById("user-website-Link").style.borderColor = "red";
      if (!twitterLink) document.getElementById("user-twitter-link").style.borderColor = "red";
      if (!instagramLink) document.getElementById("user-instagram-link").style.borderColor = "red";
      if (!facebookLink) document.getElementById("user-facebook-link").style.borderColor = "red";
      
      // Alert user to fill in all fields
      alert("Please fill in all fields.");
      return; // Exit function if any field is empty
    }
  else {
    // Remove red border color if all fields are filled
    document.getElementById("user-firstname").style.borderColor = "";
    document.getElementById("user-lastname").style.borderColor = "";
    document.getElementById("user-email").style.borderColor = "";
    document.getElementById("user-country").style.borderColor = "";
    document.getElementById("user-DOB").style.borderColor = "";
    const biographyInput = document.getElementById("user-Biography");
    const biography = biographyInput.value.trim() ? biographyInput.value.trim() : "N/A";
    document.getElementById("user-website-Link").style.borderColor = "";
    document.getElementById("user-twitter-link").style.borderColor = "";
    document.getElementById("user-instagram-link").style.borderColor = "";
    document.getElementById("user-facebook-link").style.borderColor = "";

     // Update user data object properties
     userData.firstName = firstName;
     userData.lastName = lastName;
     userData.email = email;
     userData.country = country;
     userData.dob = dob;
     userData.biography = biography;
     userData.websiteLink = websiteLink;
     userData.twitterLink = twitterLink;
     userData.instagramLink = instagramLink;
     userData.facebookLink = facebookLink;
  }
})
