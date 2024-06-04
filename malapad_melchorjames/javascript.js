document.addEventListener('DOMContentLoaded', function () {
    const commentButton = document.querySelector("#comment_button");
    const textarea = document.querySelector("#comment");
    const fullNameInput = document.querySelector("#full_name");

    const get = (id) => document.getElementById(id);
    const val = (id) => get(id).value.trim();
    const createComment = (full_name, comment) => {
        const newComment = document.createElement('div');
        newComment.classList.add('comment');
        const date = new Date().toLocaleString();
        newComment.innerHTML = 
            `<p><strong>${full_name}: </strong>${comment}</p>
             <p class="date">${date}</p>`;
        newComment.dataset.date = new Date().toISOString();
        return newComment;
    };

    function checkInputs() {
        const full_name = val('full_name');
        const comment = val('comment');
        commentButton.disabled = !full_name || !comment;
    }

    function updateCommentButton() {
        checkInputs();
    }

    function addComment() {
        const full_name = val('full_name');
        const comment = val('comment');
        const commentContainer = get('comments_container');
        const newComment = createComment(full_name, comment);
        commentContainer.append(newComment);

        get('full_name').value = '';
        get('comment').value = '';
        updateCommentButton();
    }

    function sortComments(order) {
        const commentContainer = get('comments_container');
        const comments = Array.from(commentContainer.children);

        comments.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return order === 'asc' ? dateA - dateB : dateB - dateA;
        });

        commentContainer.innerHTML = '';
        comments.forEach(comment => {
            commentContainer.append(comment);
        });
    }

    fullNameInput.addEventListener('input', checkInputs);
    textarea.addEventListener('input', checkInputs);

    get('comment_form').addEventListener('input', updateCommentButton);
    get('comment_form').addEventListener('submit', function (event) {
        event.preventDefault();
        addComment();
        sortComments('asc');
    });

    get('sort_asc_button').addEventListener('click', function () {
        sortComments('asc');
    });

    get('sort_desc_button').addEventListener('click', function () {
        sortComments('desc');
    });
});