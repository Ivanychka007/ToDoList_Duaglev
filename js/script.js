const todolist = {
  action(e) {
    const target = e.target;
    console.log();
    if (
      target.classList.contains("todolist__action") ||
      target.classList.contains("todolist__button")
    ) {
      const action = target.dataset.todolistAction;
      const elemItem = target.closest(".todolist__item");
      const elemItems = document.querySelector(".todolist__items");
      const items = elemItems.getElementsByTagName("li");
      switch (action) {
        case "deleted":
          elemItem.remove();
          break;
        case "completed":
          target.dataset.todolistAction = "";
          document.querySelector(".todolist__items").appendChild(elemItem);
          elemItem.classList.toggle("clicked");
          break;
        case "even":
          //Выделяет каждый чётный элемент
          for (let i = 0; i < items.length; i++) {
            //Потому что считаю с нуля
            if (
              i % 2 === 1 &&
              (!items[i].classList.contains("even") ||
                items[i].classList.contains("odd"))
            ) {
              if (items[i].classList.contains("odd")) {
                items[i].classList.toggle("odd");
              }
              items[i].classList.toggle("even");
            } else {
              if (i % 2 === 0 && items[i].classList.contains("even")) {
                console.log(1);
                items[i].classList.toggle("even");
              }
            }
          }
          break;
        case "odd":
          //Выделяет каждый нечётный элемент
          for (let i = 0; i < items.length; i++) {
            if (
              (i % 2 === 0 && items[i].classList.contains("even")) ||
              (i % 2 === 0 && !items[i].classList.contains("odd"))
            ) {
              if (items[i].classList.contains("even")) {
                items[i].classList.toggle("even");
              }
              items[i].classList.toggle("odd");
            } else {
              if (i % 2 === 1 && items[i].classList.contains("odd")) {
                items[i].classList.toggle("odd");
              }
            }
          }
          break;
        //удаление первого элемента
        case "delfirst":
          if (items.length >= 1) {
            items[0].remove();
          }
          break;
        //удаление полседнего элемента
        case "delend":
          if (items.length >= 1) {
            items[items.length - 1].remove();
          }
          break;
        case "add":
          this.add();
          break;
      }
      this.save();
    }
  },
  add() {
    const elemText = document.querySelector(".todolist__text");

    if (elemText.disabled || !elemText.value.length) {
      return;
    }
    document
      .querySelector(".todolist__items")
      .insertAdjacentHTML("afterbegin", this.create(elemText.value));
    elemText.value = "";
  },
  create(text) {
    return `<li class="todolist__item">
      <span class="todolist__task">${text}</span>
      <span class="todolist__action todolist__action_complete" data-todolist-action="completed">COM</span>
      <span class="todolist__action todolist__action_delete" data-todolist-action="deleted">DEL</span></li>`;
  },
  init() {
    const fromStorage = localStorage.getItem("todolist");
    if (fromStorage) {
      document.querySelector(".todolist__items").innerHTML = fromStorage;
    }
    document.addEventListener("click", this.action.bind(this));
  },

  save() {
    localStorage.setItem(
      "todolist",
      document.querySelector(".todolist__items").innerHTML
    );
  },
};

todolist.init();
