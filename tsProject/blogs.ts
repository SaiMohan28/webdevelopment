interface Blog {
    title: string;
    author: string;
    content: string;
    views: number;
    visible: boolean;
}

const blogTitle = document.getElementById("blogTitle") as HTMLInputElement | null;
const blogAuthor = document.getElementById("blogAuthor") as HTMLInputElement | null;
const blogContent = document.getElementById("blogContent") as HTMLTextAreaElement | null;
const saveBlogBtn = document.getElementById("saveBlog") as HTMLButtonElement | null;
const blogsList = document.getElementById("blogsList") as HTMLDivElement | null;

let blogs: Blog[] = JSON.parse(localStorage.getItem("blogs") || "[]");


function saveBlog(): void {
    if (!blogTitle || !blogAuthor || !blogContent) return;

    const title = blogTitle.value.trim();
    const author = blogAuthor.value.trim();
    const content = blogContent.value.trim();

    if (title && author && content) {
        blogs.push({ title, author, content, views: 0, visible: false });
        localStorage.setItem("blogs", JSON.stringify(blogs));
        renderBlogs();
        blogTitle.value = "";
        blogAuthor.value = "";
        blogContent.value = "";
    } else {
        alert("All fields are required!");
    }
}

function editBlog(index: number): void {
    const newTitle = prompt("Edit Title", blogs[index].title);
    const newContent = prompt("Edit Content", blogs[index].content);

    if (newTitle !== null && newContent !== null) {
        blogs[index].title = newTitle.trim();
        blogs[index].content = newContent.trim();
        localStorage.setItem("blogs", JSON.stringify(blogs));
        renderBlogs();
    }
}


function deleteBlog(index: number): void {
    if (confirm("Are you sure you want to delete this blog?")) {
        blogs.splice(index, 1);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        renderBlogs();
    }
}

function toggleView(index: number): void {
    if (!blogs[index].visible) {
        blogs[index].views++;
    }
    blogs[index].visible = !blogs[index].visible;
    localStorage.setItem("blogs", JSON.stringify(blogs));
    renderBlogs();
}

function renderBlogs(): void {
    if (!blogsList) return;
    blogsList.innerHTML = "";

    blogs.forEach((blog, index) => {
        const blogElement = document.createElement("div");
        blogElement.className = "p-4 border rounded shadow bg-gradient-to-r from-neutral-300 to-stone-400";

        blogElement.innerHTML = `
            <h2 class="text-xl font-semibold">${blog.title}</h2>
            <p class="text-gray-600">Author: ${blog.author}</p>
            ${blog.visible ? `<p class="text-gray-600">${blog.content}</p>` : ""}
            <p class="text-sm text-gray-500">Views: ${blog.views}</p>
            <div class="mt-2">
                <button class="toggle-view bg-green-500 text-white px-3 py-1 rounded">${blog.visible ? "Hide" : "View"}</button>
                <button class="edit-blog bg-purple-600 text-white px-3 py-1 rounded">Edit</button>
                <button class="delete-blog bg-red-500 text-white px-3 py-1 rounded">Delete</button>
            </div>
        `;

        blogElement.querySelector(".toggle-view")?.addEventListener("click", () => toggleView(index));
        blogElement.querySelector(".edit-blog")?.addEventListener("click", () => editBlog(index));
        blogElement.querySelector(".delete-blog")?.addEventListener("click", () => deleteBlog(index));

        blogsList.appendChild(blogElement);
    });
}


if (saveBlogBtn) {
    saveBlogBtn.addEventListener("click", saveBlog);
}

// Render initial blogs
renderBlogs();
