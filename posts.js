
const defaultPosts = [
 {
    id: 1,
    title: "Finding Balance Between Work and Life",
    author: "Abhisekh",
    date: "2025-01-12",
    excerpt: "Some days it feels like there just aren’t enough hours in the day.",
    content: "I often catch myself torn between finishing deadlines and wanting a quiet cup of tea with family. Balance isn’t something I’ve mastered—it’s something I’m learning bit by bit. For me, it means knowing when to switch off the laptop, even if the to-do list isn’t fully done. And honestly, I think that’s okay.",
    image: "https://picsum.photos/600/400?random=21"
  },
  {
    id: 2,
    title: "Is Growing Apart Always a Bad Thing?",
    author: "Abhisekh",
    date: "2025-03-09",
    excerpt: "Friendships don’t always end with fights—sometimes they just fade.",
    content: "There are people I used to talk to every day, and now we barely even text. For a while, it hurt, like I had failed in keeping them close. But maybe growing apart isn’t always bad—it can mean we’ve grown into different people, and that’s just a natural part of living.",
    image: "https://picsum.photos/600/400?random=33"
  },
  {
    id: 3,
    title: "Rethinking Success",
    author: "Abhisekh",
    date: "2025-03-02",
    excerpt: "Success doesn’t look the same for everyone.",
    content: "When I was younger, I thought success meant money and a fancy job title. Now, I see it differently. These days, success feels more like peace of mind, being around people who care, and waking up excited about the day. Maybe it changes as we grow older—and maybe that’s how it’s supposed to be.",
    image: "https://picsum.photos/600/400?random=23"
  },
  {
    id: 4,
    title: "Why I Try to Reflect More Often",
    author: "Abhisekh",
    date: "2025-05-08",
    excerpt: "Looking back at your own choices can be uncomfortable, but it teaches you a lot.",
    content: "Sometimes I sit with a notebook and write about the week—what went well, what didn’t, and how I felt. It’s not always pretty, but it’s real. Reflection helps me notice patterns in my life, like how often I say yes when I should’ve said no. And slowly, I try to do better the next time.",
    image: "https://picsum.photos/600/400?random=25"
  },
  {
    id: 5,
    title: "Do We Ever Truly Know Ourselves?",
    author: "Abhisekh",
    date: "2025-05-20",
    excerpt: "We keep learning about others, but how often do we stop to learn about ourselves?",
    content: "I used to think I knew exactly who I was, but life keeps surprising me with new sides of myself. One day I’m patient, the next I’m not. One year I chase goals, another year I crave stillness. Maybe we’re not fixed people at all—maybe we’re meant to be a little bit of everything, changing all the time.",
    image: "https://picsum.photos/600/400?random=35"
  }
];

let posts = JSON.parse(localStorage.getItem("posts")) || [];
if (posts.length === 0) {
  posts = defaultPosts;
  localStorage.setItem("posts", JSON.stringify(posts));
}

const postsContainer = document.getElementById("posts-container");
const addPostForm = document.getElementById("addPostForm");
const addTitle = document.getElementById("addTitle");
const addAuthor = document.getElementById("addAuthor");
const addDate = document.getElementById("addDate");
const addExcerpt = document.getElementById("addExcerpt");
const addContent = document.getElementById("addContent");
const addImage = document.getElementById("addImage");

const editPostForm = document.getElementById("editPostForm");
const editId = document.getElementById("editId");
const editTitle = document.getElementById("editTitle");
const editAuthor = document.getElementById("editAuthor");
const editDate = document.getElementById("editDate");
const editExcerpt = document.getElementById("editExcerpt");
const editContent = document.getElementById("editContent");
const editImage = document.getElementById("editImage");

let addModal, editModal;
document.addEventListener("DOMContentLoaded", () => {
  addModal = new bootstrap.Modal(document.getElementById("addPostModal"));
  editModal = new bootstrap.Modal(document.getElementById("editPostModal"));
});

function renderPosts() {
  postsContainer.innerHTML = "";
  posts.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-md-4";

    col.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top" alt="${p.title}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${new Date(p.date).toLocaleDateString()}</h6>
          <p class="card-text flex-grow-1">${p.excerpt}</p>
          <div class="d-flex justify-content-between mt-auto">
            <button class="btn btn-outline-primary btn-sm" onclick="readPost(${p.id})">Read More</button>
            <div>
              <button class="btn btn-outline-success btn-sm me-1" onclick="openEditPost(${p.id})">Edit</button>
              <button class="btn btn-outline-danger btn-sm" onclick="deletePost(${p.id})">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;
    postsContainer.appendChild(col);
  });
}

addPostForm.addEventListener("submit", e => {
  e.preventDefault();

  const newPost = {
    id: Date.now(),
    title: addTitle.value,
    author: addAuthor.value,
    date: addDate.value,
    excerpt: addExcerpt.value,
    content: addContent.value,
    image: addImage.value || `https://picsum.photos/600/400?random=${Math.floor(Math.random() * 100)}`
  };

  posts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(posts));

  renderPosts();
  addPostForm.reset();
  addModal.hide();
});

function openEditPost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    editId.value = post.id;
    editTitle.value = post.title;
    editAuthor.value = post.author;
    editDate.value = post.date;
    editExcerpt.value = post.excerpt;
    editContent.value = post.content;
    editImage.value = post.image;

    editModal.show();
  }
}

editPostForm.addEventListener("submit", e => {
  e.preventDefault();

  const id = parseInt(editId.value);
  posts = posts.map(p =>
    p.id === id
      ? {
          id,
          title: editTitle.value,
          author: editAuthor.value,
          date: editDate.value,
          excerpt: editExcerpt.value,
          content: editContent.value,
          image: editImage.value || p.image
        }
      : p
  );

  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
  editModal.hide();
});

function deletePost(id) {
  if (confirm("Are you sure you want to delete this post?")) {
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
  }
}

function readPost(id) {
  const post = posts.find(p => p.id === id);
  if (post) {
    alert(`${post.title}\n\nBy ${post.author} on ${new Date(post.date).toLocaleDateString()}\n\n${post.content}`);
  }
}

renderPosts();

window.openEditPost = openEditPost;
window.readPost = readPost;
window.deletePost = deletePost;
