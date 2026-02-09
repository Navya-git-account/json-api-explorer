// DOM elements
const postForm = document.getElementById("postForm");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

const fetchButton = document.getElementById("fetchButton");
const postList = document.getElementById("postList");
const errorDiv = document.getElementById("error");

// -------------------------
// 1️⃣ Fetch and Display Posts
// -------------------------
async function fetchPosts() {
    postList.innerHTML = "Loading posts...";
    errorDiv.textContent = "";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!response.ok) throw new Error("Network response was not ok");
        const posts = await response.json();

        // Clear the postList
        postList.innerHTML = "";

        // Render posts
        posts.forEach(post => {
            const div = document.createElement("div");
            div.classList.add("post");
            div.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            `;
            postList.appendChild(div);
        });
    } catch (err) {
        postList.innerHTML = "";
        errorDiv.textContent = `Error fetching posts: ${err.message}`;
    }
}

// Event listener for fetch button
fetchButton.addEventListener("click", fetchPosts);

// -------------------------
// 2️⃣ Create and Send a New Post
// -------------------------
postForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    // Clear messages
    formError.textContent = "";
    formSuccess.textContent = "";

    const newPost = {
        title: document.getElementById("titleInput").value,
        body: document.getElementById("bodyInput").value,
        userId: 1 // optional
    };

    formSuccess.textContent = "Submitting post...";

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        });

        if (!response.ok) throw new Error("Failed to submit post");
        const data = await response.json();

        formSuccess.textContent = `Post submitted successfully! ID: ${data.id}`;
        postForm.reset();
    } catch (err) {
        formError.textContent = `Error submitting post: ${err.message}`;
        formSuccess.textContent = "";
    }
});
