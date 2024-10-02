// Utility function to show a specific section and hide others
function showSection(sectionId) {
    const sections = document.querySelectorAll('main > section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}

// Navigation Links
document.getElementById('registerLink').addEventListener('click', function(event) {
    event.preventDefault();
    showSection('register');
});

document.getElementById('loginLink').addEventListener('click', function(event) {
    event.preventDefault();
    showSection('login');
});

document.getElementById('logoutLink').addEventListener('click', function(event) {
    event.preventDefault();
    logoutUser();
});

// Registration Form Handling
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const address = document.getElementById('address').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const emergencyContactName = document.getElementById('emergencyContactName').value.trim();
    const emergencyContactNumber = document.getElementById('emergencyContactNumber').value.trim();

    if (fullName && email && address && phone && emergencyContactName && emergencyContactNumber) {
        // Check if user already exists
        if (localStorage.getItem(`user_${email}`)) {
            alert('User already exists. Please login.');
            return;
        }

        // Create user object
        const user = {
            fullName,
            email,
            address,
            phone,
            emergencyContacts: [
                {
                    name: emergencyContactName,
                    number: emergencyContactNumber
                }
            ]
        };

        // Store user data in local storage
        localStorage.setItem(`user_${email}`, JSON.stringify(user));

        alert('Registration successful. You can now log in.');
        document.getElementById('registerForm').reset();
        showSection('login');
    } else {
        alert('Please fill out all the fields.');
    }
});

// Login Form Handling
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const loginEmail = document.getElementById('loginEmail').value.trim();
    const storedUser = localStorage.getItem(`user_${loginEmail}`);
    
    if (storedUser) {
        // Set logged in user
        localStorage.setItem('loggedInUser', loginEmail);
        alert('Login successful.');
        document.getElementById('loginForm').reset();
        updateUIAfterLogin();
    } else {
        alert('Invalid email. Please register first.');
    }
});

// Logout Functionality
function logoutUser() {
    localStorage.removeItem('loggedInUser');
    alert('Logged out successfully.');
    document.getElementById('logoutLink').style.display = 'none';
    document.getElementById('emergencyContactSection').style.display = 'none';
    document.getElementById('addEmergencyContactSection').style.display = 'none';
    document.getElementById('savedContactsSection').style.display = 'none';
    showSection('home');
}

// Update UI After Login
function updateUIAfterLogin() {
    const loggedInEmail = localStorage.getItem('loggedInUser');
    if (loggedInEmail) {
        const user = JSON.parse(localStorage.getItem(`user_${loggedInEmail}`));
        if (user) {
            // Display Emergency Contact Information
            document.getElementById('displayFullName').textContent = user.fullName;
            document.getElementById('displayAddress').textContent = user.address;
            document.getElementById('displayPhone').textContent = user.phone;
            if (user.emergencyContacts.length > 0) {
                document.getElementById('displayEmergencyContactName').textContent = user.emergencyContacts[0].name;
                document.getElementById('displayEmergencyContactNumber').textContent = user.emergencyContacts[0].number;
            }
            document.getElementById('emergencyContactSection').style.display = 'block';
            document.getElementById('addEmergencyContactSection').style.display = 'block';
            document.getElementById('savedContactsSection').style.display = 'block';
            document.getElementById('logoutLink').style.display = 'inline-block';
            showSection('home');
            populateSavedContacts(user);
        }
    }
}

// Populate Saved Emergency Contacts in Dropdown
function populateSavedContacts(user) {
    const contactList = document.getElementById('contactList');
    contactList.innerHTML = ''; // Clear existing contacts

    user.emergencyContacts.forEach(contact => {
        const contactEntry = document.createElement('p');
        contactEntry.textContent = `${contact.name}: ${contact.number}`;
        contactList.appendChild(contactEntry);
    });
}

// Check if user is already logged in on page load
window.onload = function() {
    updateUIAfterLogin();
};

// Handle Emergency Contact Form Submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const contactName = document.getElementById('contactName').value.trim();
    const contactNumber = document.getElementById('contactNumber').value.trim();

    if (contactName && contactNumber) {
        const loggedInEmail = localStorage.getItem('loggedInUser');
        if (loggedInEmail) {
            const user = JSON.parse(localStorage.getItem(`user_${loggedInEmail}`));
            user.emergencyContacts.push({ name: contactName, number: contactNumber });
            localStorage.setItem(`user_${loggedInEmail}`, JSON.stringify(user));
            populateSavedContacts(user);
            alert('Emergency contact has been added.');
            document.getElementById('contactForm').reset();
        } else {
            alert('No user is logged in.');
        }
    } else {
        alert('Please enter both name and contact number.');
    }
});

// Blog Functionality (Unchanged)
function openBlog(blogId) {
    let blogs = {
        1: `
            <h2>How the SOS Ring is Transforming Women’s Safety</h2>
            <p>In today’s world, safety is a top concern for women. Whether commuting, walking alone, or in unfamiliar areas, personal safety should be easy to ensure. The SOS Ring offers a new solution: a discreet wearable ring designed for emergencies. With a hidden button, it sends real-time alerts to emergency contacts and local authorities, offering security when it’s needed most.</p>
            <p>What Makes the SOS Ring Unique? The SOS Ring looks like a stylish accessory but hides powerful functionality. A simple button press sends your live location to your chosen contacts and local police, ensuring that help is on the way without drawing attention to the distress. The device connects to a smartphone app for seamless integration, making it a perfect daily safety tool.</p>
            <p>Real-Time Location Sharing When an emergency strikes, the SOS Ring’s GPS instantly activates, sending your live location to emergency contacts. This helps responders track your movements and ensure a fast response. The ring provides continuous location updates, allowing real-time tracking until you're safe again.</p>
            <p>Conclusion The SOS Ring combines fashion with functionality to redefine safety for women. Its discreet design and advanced technology offer an innovative solution for personal security, giving users peace of mind knowing help is just a button away.</p>
        `,
        2: `
            <h2>5 Essential Tools for Women’s Safety</h2>
            <p>Women deserve to feel safe, whether at home or out. Modern technology provides several tools to enhance personal security, with the SOS Ring being one of the most innovative. Here’s a look at five must-have safety tools for women today.</p>
            <p>1. SOS Ring: This wearable device is a powerful safety tool that combines style and functionality. A hidden button allows users to discreetly send their live location to emergency contacts and police. It’s perfect for everyday use and offers real-time location tracking during emergencies.</p>
            <p>2. Personal Safety Apps: Apps like “bSafe” offer safety features such as GPS tracking and quick-access emergency alerts. These apps complement the SOS Ring by providing additional safety layers when needed.</p>
            <p>3. Pepper Spray or Personal Alarms: Carrying portable self-defense items like pepper spray or alarms can be a quick way to fend off attackers in dangerous situations.</p>
            <p>4. Smart Jewelry: Other wearable safety devices like necklaces or bracelets can also discreetly send emergency alerts, much like the SOS Ring.</p>
            <p>5. GPS Trackers: Small GPS trackers can be hidden in bags or attached to clothing, providing family or friends with real-time updates of your location.</p>
            <p>Conclusion: Tools like the SOS Ring represent the future of women’s safety, making it easier than ever to protect yourself discreetly and effectively.</p>
        `,
        3: `
            <h2>Why Real-Time Location Sharing is Key in Emergencies</h2>
            <p>During emergencies, every second matters. Real-time location sharing ensures help reaches you as quickly as possible. The SOS Ring uses this technology to empower women to get immediate assistance by alerting contacts and authorities with just one button press.</p>
            <p>How Does Real-Time Location Sharing Help? In high-stress situations, it can be hard to call or message for help. With the SOS Ring, pressing the hidden button automatically sends your live GPS location to pre-selected contacts and nearby authorities. This feature guarantees that you don’t have to explain where you are – responders can follow your real-time movements until you’re safe.</p>
            <p>Privacy and Safety: The SOS Ring only shares your location when the emergency button is pressed, ensuring your privacy remains protected during everyday use.</p>
            <p>Conclusion: The SOS Ring’s real-time location sharing feature is essential for emergencies, allowing you to focus on your safety while help is already on the way.</p>
        `
    };

    let newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <html>
        <head>
            <title>Blog Article</title>
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
                    line-height: 1.6;
                    background: linear-gradient(135deg, #007BFF, #6c63ff);
                    color: white;
                    padding: 40px;
                    text-align: center;
                }
                h2 {
                    font-size: 2.5rem;
                    margin-bottom: 20px;
                }
                p {
                    font-size: 1.2rem;
                    margin-bottom: 20px;
                }
                a {
                    display: inline-block;
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: white;
                    color: #007BFF;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
                a:hover {
                    background: #f0f0f0;
                }
            </style>
        </head>
        <body>
            ${blogs[blogId]}
            <a href="#" onclick="window.close()">Close</a>
        </body>
        </html>
    `);
}

// Dropdown toggle functionality
document.querySelector('.dropdown-btn').addEventListener('click', function() {
    this.parentElement.classList.toggle('show');
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown");
        for (let i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};
