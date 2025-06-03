const form = document.getElementById("form");
      const eltodos = document.getElementById("todos");

      let todos = JSON.parse(localStorage.getItem("todos")) || [];

      function uiUpdater() {
        localStorage.setItem("todos", JSON.stringify(todos));
        eltodos.innerHTML = "";

        if (todos.length > 0) {
          todos.forEach(({ id, title, status }) => {
            const li = document.createElement("li");
            li.className =
              "flex justify-between items-center p-2 border rounded";

            const h3 = document.createElement("h3");
            h3.textContent = title;
            h3.className = status ? "line-through" : "";

            const actionPanel = document.createElement("div");
            actionPanel.className = "flex items-center gap-2";

            const btn = document.createElement("button");
            btn.className = "btn btn-outline btn-error btn-sm";
            btn.textContent = "Delete";
            btn.addEventListener("click", () => deletetodo(id));

            const icon = document.createElement("span");
            icon.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            `;

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = status;
            checkbox.className = "checkbox checkbox-primary";
            checkbox.addEventListener("change", () => changeStatus(id));

            actionPanel.appendChild(btn);
            actionPanel.appendChild(icon);
            actionPanel.appendChild(checkbox);

            li.appendChild(h3);
            li.appendChild(actionPanel);
            eltodos.appendChild(li);
          });
        } else {
          eltodos.innerHTML = "<h3>No data</h3>";
        }
      }

      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.todo;
        const newtodo = {
          id: Date.now(),
          title: input.value,
          status: false,
        };
        todos.push(newtodo);
        uiUpdater();
        input.value = "";
      });

      function deletetodo(id) {
        todos = todos.filter((todo) => todo.id !== id);
        uiUpdater();
        const remove = document.getElementById("myAudio")
        remove.play()
      }

      function changeStatus(id) {
        todos = todos.map((todo) =>
          todo.id === id ? { ...todo, status: !todo.status } : todo
        );
        uiUpdater();
      }

      uiUpdater();

      const themeToggle = document.getElementById("theme-toggle");
      themeToggle.addEventListener("change", () => {
        document.documentElement.setAttribute(
          "data-theme",
          themeToggle.checked ? "dark" : "light"
        );
      });