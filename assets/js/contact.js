const UNSURE = "Not sure yet";

export function initContact() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const budgetField = form.querySelector("#budget-field");
  const budgetSelect = form.querySelector("#budget");
  const budgetNote = form.querySelector("#budget-note");
  const budgetLive = form.querySelector("#budget-live");
  const status = form.querySelector("#form-status");
  const submitButton = form.querySelector("[type='submit']");
  const groups = new Map();
  let sending = false;
  let budgetPicker = null;

  if (budgetSelect) {
    budgetSelect.querySelectorAll("optgroup").forEach((group) => {
      const service = group.getAttribute("data-service");
      if (service) groups.set(service, group);
      group.remove();
    });
  }

  if (budgetField) budgetField.hidden = true;
  if (budgetNote) budgetNote.hidden = true;

  const radios = () => [...form.querySelectorAll('input[name="Service needed"]')];

  const errorFor = (field) => {
    const described = field.getAttribute("aria-describedby") || "";
    const id = described.split(/\s+/).find((item) => item.endsWith("-error"));
    return id ? document.getElementById(id) : null;
  };

  const setError = (field, message) => {
    const error = errorFor(field);
    if (message) {
      field.setAttribute("aria-invalid", "true");
      if (error) error.textContent = message;
    } else {
      field.removeAttribute("aria-invalid");
      if (error) error.textContent = "";
    }
    if (field === budgetSelect) budgetPicker?.syncInvalid();
  };

  const createBudgetPicker = (select) => {
    const label = budgetField?.querySelector('label[for="budget"]');
    const wrap = document.createElement("div");
    wrap.className = "budget-select";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "budget-select-trigger";
    trigger.id = "budget-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "budget-listbox");

    const valueText = document.createElement("span");
    valueText.className = "budget-select-value";

    const caret = document.createElement("span");
    caret.className = "budget-select-caret";
    caret.setAttribute("aria-hidden", "true");

    trigger.append(valueText, caret);

    const list = document.createElement("ul");
    list.className = "budget-select-list";
    list.id = "budget-listbox";
    list.setAttribute("role", "listbox");
    list.hidden = true;

    select.classList.add("budget-select-native");
    select.setAttribute("tabindex", "-1");
    select.setAttribute("aria-hidden", "true");
    select.parentNode.insertBefore(wrap, select);
    wrap.append(select, trigger, list);

    if (label) {
      label.removeAttribute("for");
      label.id = label.id || "budget-label";
      trigger.setAttribute("aria-labelledby", label.id);
    }

    const described = select.getAttribute("aria-describedby");
    if (described) trigger.setAttribute("aria-describedby", described);

    const close = () => {
      list.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
    };

    const open = () => {
      list.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      const selected =
        list.querySelector('[aria-selected="true"]') || list.querySelector('[role="option"]');
      selected?.focus();
    };

    const syncValue = () => {
      const selected = select.options[select.selectedIndex];
      valueText.textContent = selected ? selected.textContent : "Prefer to discuss";
      list.querySelectorAll('[role="option"]').forEach((item) => {
        item.setAttribute(
          "aria-selected",
          item.dataset.value === select.value ? "true" : "false"
        );
      });
    };

    const syncOptions = () => {
      list.replaceChildren();
      [...select.options].forEach((option, index) => {
        const item = document.createElement("li");
        item.className = "budget-select-option";
        item.setAttribute("role", "option");
        item.setAttribute("tabindex", "-1");
        item.id = `budget-option-${index}`;
        item.dataset.value = option.value;
        item.textContent = option.textContent;
        item.setAttribute(
          "aria-selected",
          option.value === select.value ? "true" : "false"
        );
        item.addEventListener("click", () => {
          select.value = option.value;
          syncValue();
          close();
          trigger.focus();
        });
        list.append(item);
      });
      syncValue();
    };

    const options = () => [...list.querySelectorAll('[role="option"]')];

    const moveFocus = (delta) => {
      const items = options();
      if (!items.length) return;
      const current = document.activeElement;
      const index = items.indexOf(current);
      const next = items[(index + delta + items.length) % items.length];
      next.focus();
    };

    trigger.addEventListener("click", () => {
      if (list.hidden) open();
      else close();
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (list.hidden) open();
      }
    });

    list.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        trigger.focus();
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        moveFocus(1);
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        moveFocus(-1);
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        options()[0]?.focus();
        return;
      }
      if (event.key === "End") {
        event.preventDefault();
        options().at(-1)?.focus();
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const active = document.activeElement;
        if (active instanceof HTMLElement && active.getAttribute("role") === "option") {
          active.click();
        }
      }
    });

    document.addEventListener("click", (event) => {
      if (!(event.target instanceof Node)) return;
      if (!wrap.contains(event.target)) close();
    });

    syncOptions();

    return {
      syncOptions,
      close,
      syncInvalid() {
        if (select.getAttribute("aria-invalid") === "true") {
          trigger.setAttribute("aria-invalid", "true");
        } else {
          trigger.removeAttribute("aria-invalid");
        }
      },
    };
  };

  if (budgetSelect) budgetPicker = createBudgetPicker(budgetSelect);

  const clearBudgetOptions = () => {
    if (!budgetSelect) return;
    [...budgetSelect.options].forEach((option) => {
      if (option.value !== "") option.remove();
    });
    budgetSelect.value = "";
    budgetPicker?.syncOptions();
    budgetPicker?.close();
  };

  const appendOptions = (service) => {
    const group = groups.get(service);
    if (!group || !budgetSelect) return;
    group.querySelectorAll("option").forEach((source) => {
      const option = document.createElement("option");
      option.value = source.value;
      option.textContent = source.textContent;
      budgetSelect.append(option);
    });
    budgetSelect.value = "";
    budgetPicker?.syncOptions();
  };

  const hide = (element) => {
    if (!element) return;
    element.hidden = true;
    element.classList.remove("is-revealed");
  };

  const show = (element) => {
    if (!element) return;
    element.hidden = false;
    element.classList.remove("is-revealed");
    window.requestAnimationFrame(() => {
      element.classList.add("is-revealed");
    });
  };

  const announce = (message) => {
    if (!budgetLive) return;
    budgetLive.textContent = "";
    window.requestAnimationFrame(() => {
      budgetLive.textContent = message;
    });
  };

  const applyService = (service) => {
    clearBudgetOptions();
    if (!service) {
      hide(budgetField);
      hide(budgetNote);
      if (budgetLive) budgetLive.textContent = "";
      return;
    }
    if (service === UNSURE) {
      hide(budgetField);
      show(budgetNote);
      if (budgetLive) budgetLive.textContent = "";
      return;
    }
    hide(budgetNote);
    appendOptions(service);
    show(budgetField);
    const spoken = service.charAt(0).toLowerCase() + service.slice(1);
    announce(`Budget options updated for ${spoken}.`);
  };

  const checks = [
    {
      id: "name",
      run(value) {
        if (!value.trim()) return "Please enter your name.";
        return "";
      },
    },
    {
      id: "email",
      run(value) {
        const email = value.trim();
        if (!email) return "Please enter your email.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email.";
        return "";
      },
    },
    {
      id: "phone",
      run(value) {
        if (!value.trim()) return "";
        const stripped = value.replace(/[\s+\-–—()[\]]/g, "");
        if (!/^\d{7,}$/.test(stripped)) return "Please enter a valid phone or WhatsApp number.";
        return "";
      },
    },
    {
      id: "message",
      run(value) {
        if (value.trim().length < 10) return "Please write at least 10 characters.";
        return "";
      },
    },
  ];

  const validateService = () => {
    const group = radios();
    const message = group.some((radio) => radio.checked) ? "" : "Please choose what you need.";
    const error = document.getElementById("service-error");
    if (error) error.textContent = message;
    group.forEach((radio) => {
      if (message) radio.setAttribute("aria-invalid", "true");
      else radio.removeAttribute("aria-invalid");
    });
    return !message;
  };

  const validateField = (id) => {
    const field = form.querySelector(`#${id}`);
    const check = checks.find((item) => item.id === id);
    if (!field || !check) return true;
    const message = check.run(field.value);
    setError(field, message);
    return !message;
  };

  const validateForm = () => {
    const serviceOk = validateService();
    let fieldsOk = true;
    checks.forEach((item) => {
      if (!validateField(item.id)) fieldsOk = false;
    });
    return serviceOk && fieldsOk;
  };

  const setPlainStatus = (message, state) => {
    if (!status) return;
    status.replaceChildren(document.createTextNode(message));
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };

  const setErrorStatus = () => {
    if (!status) return;
    const mail = form.closest(".contact")?.querySelector('a[href^="mailto:"]');
    const email =
      (mail instanceof HTMLAnchorElement && mail.href.replace(/^mailto:/i, "")) ||
      "zil212002@gmail.com";
    const link = document.createElement("a");
    link.href = `mailto:${email}`;
    link.textContent = email;
    status.replaceChildren(
      document.createTextNode("Sorry, that did not send. Please email me at "),
      link,
      document.createTextNode(" or message me on WhatsApp.")
    );
    status.dataset.state = "error";
  };

  const markSuccess = () => {
    form.reset();
    radios().forEach((radio) => radio.removeAttribute("aria-invalid"));
    const serviceError = document.getElementById("service-error");
    if (serviceError) serviceError.textContent = "";
    checks.forEach((item) => {
      const field = form.querySelector(`#${item.id}`);
      if (field) setError(field, "");
    });
    clearBudgetOptions();
    hide(budgetField);
    hide(budgetNote);
    if (budgetLive) budgetLive.textContent = "";
    setPlainStatus("Thank you! Your message was sent.", "success");
    try {
      window.hcaptcha?.reset();
    } catch {
      /* The widget is not on the page yet. The enquiry still succeeded. */
    }
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;
    if (!validateForm()) {
      const invalid = form.querySelector("[aria-invalid='true']");
      if (invalid instanceof HTMLInputElement && invalid.type === "radio") {
        const choice = invalid.closest(".choice");
        if (choice instanceof HTMLElement) {
          choice.setAttribute("tabindex", "-1");
          choice.focus();
        }
      } else {
        invalid?.focus();
      }
      return;
    }

    const trap = form.querySelector("[name='botcheck']");
    if (trap instanceof HTMLInputElement && trap.checked) {
      markSuccess();
      return;
    }

    sending = true;
    if (submitButton instanceof HTMLButtonElement) submitButton.disabled = true;
    setPlainStatus("Sending...");

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
        signal: controller.signal,
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (response.status === 200 && data && data.success) markSuccess();
      else setErrorStatus();
    } catch {
      setErrorStatus();
    } finally {
      window.clearTimeout(timer);
      sending = false;
      if (submitButton instanceof HTMLButtonElement) submitButton.disabled = false;
    }
  });

  checks.forEach((item) => {
    const field = form.querySelector(`#${item.id}`);
    if (!field) return;
    const clear = () => {
      if (field.getAttribute("aria-invalid") === "true") setError(field, "");
    };
    field.addEventListener("input", clear);
    field.addEventListener("change", clear);
  });

  radios().forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.getAttribute("aria-invalid") === "true") validateService();
      applyService(radio.value);
    });
  });
}
