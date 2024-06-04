var button = document.getElementById("button_01");
var textarea = document.getElementById("textarea_01");
var text = document.getElementById("input_01");

function checkInputs() {
  if (textarea.value.trim() !== "" && text.value.trim() !== "") {
    button.disabled = false; // Enable the button
  } else {
    button.disabled = true; // Disable the button
  }
}

textarea.addEventListener("input", checkInputs);
text.addEventListener("input", checkInputs);

const get = (id) => document.getElementById(id);
const val = (id) => get(id).value.trim();
const createComment = (full_name, comment) => {
    const newComment = document.createElement('div');
    newComment.classList.add('comment');
    newComment.innerHTML = <p><strong>${full_name}: </strong>${comment}</p>;
    newComment.dataset.date = new Date().toISOString();
    return newComment;
};

function updateCommentButton() {
    const full_name = get('full_name').value;
    const comment = get('comment').value;
    const comment_button = get('comment_button');

    comment_button.disabled = full_name.trim() === ''|| comment.trim() === '';
}

function addComment() {
    const full_name = get('full_name').value;
    const comment = get('comment').value;
    const commentContainer = get('comments_container');
    const newComment = createComment(full_name, comment);
    commentContainer.prepend(newComment);
    get('full_name').value = '';
    get('comment').value = '';
}

function sortComments(order) {
    const commentContainer = get('comments_container');
    const comments = Array.from(commentContainer.children);

    comments.sort(function(a, b) {
        const dateA = new Date(a.dataset.date);
        const dateB = new Date(b.dataset.date);

        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });

    commentContainer.innerHTML = '';
    comments.forEach(function(comment) {
        commentContainer.appendChild(comment);
    });
}

get('comment_form').addEventListener('input', updateCommentButton);

get('comment_form').addEventListener('submit', function(event) {
    event.preventDefault();
    addComment();
    updateCommentButton();
    sortComments('asc');
});

get('sort_asc_button').addEventListener('click', function() {
    sortComments('asc');
});

get('sort_desc_button').addEventListener('click', function() {
    sortComments('desc');
});