// Simple comment system using localStorage
// Key includes post id so multiple posts can store separately if extended
const POST_ID = "post-1";
const STORAGE_KEY = `comments_${POST_ID}`;

const nameInput = document.getElementById("nameInput");
const commentInput = document.getElementById("commentInput");
const postBtn = document.getElementById("postBtn");
const commentList = document.getElementById("commentList");

let comments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// render comments to DOM
function renderComments() {
  if (!commentList) return;
  if (comments.length === 0) {
    commentList.innerHTML = `<p style="color:#666">No comments yet. Be the first to comment!</p>`;
    return;
  }

  commentList.innerHTML = comments
    .map(
      (c) => `
      <div class="comment">
        <div class="who">${escapeHtml(
          c.name
        )} <span style="color:#999;font-weight:400;font-size:0.9rem">• ${new Date(
        c.time
      ).toLocaleString()}</span></div>
        <div class="text">${escapeHtml(c.text)}</div>
      </div>
    `
    )
    .join("");
}

// basic XSS prevention (escape)
function escapeHtml(str = "") {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

postBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const text = commentInput.value.trim();

  if (!name || !text) {
    alert("Please enter your name and comment.");
    return;
  }

  const newComment = {
    name,
    text,
    time: Date.now(),
  };

  comments.unshift(newComment); // newest first
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  nameInput.value = "";
  commentInput.value = "";
  renderComments();
});

// render on load
document.addEventListener("DOMContentLoaded", renderComments);
