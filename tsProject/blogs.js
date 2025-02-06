var blogTitle = document.getElementById("blogTitle");
var blogAuthor = document.getElementById("blogAuthor");
var blogContent = document.getElementById("blogContent");
var saveBlogBtn = document.getElementById("saveBlog");
var blogsList = document.getElementById("blogsList");
var blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
function saveBlog() {
    if (!blogTitle || !blogAuthor || !blogContent)
        return;
    var title = blogTitle.value.trim();
    var author = blogAuthor.value.trim();
    var content = blogContent.value.trim();
    if (title && author && content) {
        blogs.push({ title: title, author: author, content: content, views: 0, visible: false });
        localStorage.setItem("blogs", JSON.stringify(blogs));
        renderBlogs();
        blogTitle.value = "";
        blogAuthor.value = "";
        blogContent.value = "";
    }
    else {
        alert("All fields are required!");
    }
}
function editBlog(index) {
    var newTitle = prompt("Edit Title", blogs[index].title);
    var newContent = prompt("Edit Content", blogs[index].content);
    if (newTitle !== null && newContent !== null) {
        blogs[index].title = newTitle.trim();
        blogs[index].content = newContent.trim();
        localStorage.setItem("blogs", JSON.stringify(blogs));
        renderBlogs();
    }
}
function deleteBlog(index) {
    if (confirm("Are you sure you want to delete this blog?")) {
        blogs.splice(index, 1);
        localStorage.setItem("blogs", JSON.stringify(blogs));
        renderBlogs();
    }
}
function toggleView(index) {
    if (!blogs[index].visible) {
        blogs[index].views++;
    }
    blogs[index].visible = !blogs[index].visible;
    localStorage.setItem("blogs", JSON.stringify(blogs));
    renderBlogs();
}
function renderBlogs() {
    if (!blogsList)
        return;
    blogsList.innerHTML = "";
    blogs.forEach(function (blog, index) {
        var _a, _b, _c;
        var blogElement = document.createElement("div");
        blogElement.className = "p-4 border rounded shadow bg-gradient-to-r from-neutral-300 to-stone-400";
        blogElement.innerHTML = "\n            <h2 class=\"text-xl font-semibold\">".concat(blog.title, "</h2>\n            <p class=\"text-gray-600\">Author: ").concat(blog.author, "</p>\n            ").concat(blog.visible ? "<p class=\"text-gray-600\">".concat(blog.content, "</p>") : "", "\n            <p class=\"text-sm text-gray-500\">Views: ").concat(blog.views, "</p>\n            <div class=\"mt-2\">\n                <button class=\"toggle-view bg-green-500 text-white px-3 py-1 rounded\">").concat(blog.visible ? "Hide" : "View", "</button>\n                <button class=\"edit-blog bg-purple-600 text-white px-3 py-1 rounded\">Edit</button>\n                <button class=\"delete-blog bg-red-500 text-white px-3 py-1 rounded\">Delete</button>\n            </div>\n        ");
        (_a = blogElement.querySelector(".toggle-view")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return toggleView(index); });
        (_b = blogElement.querySelector(".edit-blog")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () { return editBlog(index); });
        (_c = blogElement.querySelector(".delete-blog")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", function () { return deleteBlog(index); });
        blogsList.appendChild(blogElement);
    });
}
if (saveBlogBtn) {
    saveBlogBtn.addEventListener("click", saveBlog);
}
// Render initial blogs
renderBlogs();
