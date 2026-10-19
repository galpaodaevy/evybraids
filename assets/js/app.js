const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);
const now = new Date(),
  today = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
  maxDate = new Date(today);
maxDate.setDate(maxDate.getDate() + 90);
let month = new Date(today.getFullYear(), today.getMonth(), 1),
  chosen = null,
  time = null,
  messageEdited = false;
const fmt = (d) =>
  d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
function syncTheme() {
  const dark = document.documentElement.dataset.theme === "dark";
  $("#theme-toggle").setAttribute(
    "aria-label",
    dark ? "Ativar modo dia" : "Ativar modo noite",
  );
  $("#theme-toggle").innerHTML = dark
    ? "☀ <span>Dia</span>"
    : "☾ <span>Noite</span>";
  document.querySelector('meta[name="theme-color"]').content = dark
    ? "#17151b"
    : "#ebe2cf";
}
$("#theme-toggle").onclick = () => {
  const theme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("evy-theme", theme);
  } catch {}
  syncTheme();
};
syncTheme();
function available(d) {
  return d > today && d <= maxDate && d.getDay() !== 0 && d.getDay() !== 1;
}
function renderCalendar() {
  $("#month").textContent = month.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });
  $("#days").replaceChildren();
  $("#prev").disabled =
    month <= new Date(today.getFullYear(), today.getMonth(), 1);
  $("#next").disabled =
    month >= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
  for (let i = 0; i < month.getDay(); i++)
    $("#days").append(document.createElement("span"));
  const count = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  for (let n = 1; n <= count; n++) {
    const d = new Date(month.getFullYear(), month.getMonth(), n),
      b = document.createElement("button");
    b.type = "button";
    b.textContent = n;
    b.disabled = !available(d);
    b.setAttribute(
      "aria-label",
      fmt(d) +
        (b.disabled ? " · indisponível" : " · disponível na demonstração"),
    );
    b.setAttribute("aria-pressed", String(chosen?.getTime() === d.getTime()));
    b.classList.toggle("selected", chosen?.getTime() === d.getTime());
    b.onclick = () => {
      chosen = d;
      time = null;
      renderCalendar();
      renderTimes();
      updateSelection();
      updateMessage();
    };
    $("#days").append(b);
  }
}
$("#prev").onclick = () => {
  month = new Date(month.getFullYear(), month.getMonth() - 1, 1);
  renderCalendar();
};
$("#next").onclick = () => {
  month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
  renderCalendar();
};
function renderTimes() {
  $("#times").replaceChildren();
  if (!chosen) {
    const s = document.createElement("span");
    s.className = "time-placeholder";
    s.textContent = "Escolha um dia ali em cima ↑";
    $("#times").append(s);
    return;
  }
  const slots =
    chosen.getDay() === 6 ? ["09:00", "13:00"] : ["09:00", "14:00", "17:00"];
  slots.forEach((t) => {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = t;
    b.classList.toggle("selected", time === t);
    b.setAttribute("aria-pressed", String(time === t));
    b.onclick = () => {
      time = t;
      renderTimes();
      updateSelection();
      updateMessage();
    };
    $("#times").append(b);
  });
}
function getService() {
  return $("#service").value === "Outra ideia / minha referência"
    ? $("#custom-service").value.trim() || "Minha própria referência"
    : $("#service").value || "A combinar";
}
function updateSelection() {
  $("#selection").textContent = chosen
    ? time
      ? `${getService()} · ${fmt(chosen)} às ${time}`
      : `${fmt(chosen)} · falta escolher seu horário.`
    : "Escolha seu estilo, um dia e um horário.";
}
function generatedMessage() {
  const name = $("#name").value.trim();
  return `Oi, Evy! ${name ? `Sou ${name}. ` : ""}Bora conversar sobre meu próximo visual?\n\nTipo de trança / referência: ${getService()}\nDia desejado: ${chosen ? fmt(chosen) : "A combinar"}\nHorário: ${time || "A combinar"}\nComprimento: ${$("#length").value}\nCor / acessórios: ${$("#color").value.trim() || "A combinar"}${$("#notes").value.trim() ? `\n\nMinha ideia: ${$("#notes").value.trim()}` : ""}\n\nEscolhi na agenda demonstrativa. Pode me confirmar a disponibilidade, o valor, a duração e os materiais?`;
}
function updateMessage() {
  if (!messageEdited) $("#message").value = generatedMessage();
}
$("#service").onchange = () => {
  $("#custom-service").hidden =
    $("#service").value !== "Outra ideia / minha referência";
  updateSelection();
  updateMessage();
};
["#name", "#custom-service", "#length", "#color", "#notes"].forEach((s) =>
  $(s).addEventListener("input", () => {
    updateSelection();
    updateMessage();
  }),
);
$("#message").oninput = () => (messageEdited = true);
$("#reset-message").onclick = () => {
  messageEdited = false;
  updateMessage();
  toast("Mensagem atualizada com suas escolhas.");
};
$("#booking-form").onsubmit = (e) => {
  e.preventDefault();
  if (!chosen || !time) {
    $("#selection").textContent =
      "Escolha um dia e um horário para preparar seu pedido.";
    $("#selection").setAttribute("role", "alert");
    return;
  }
  $("#personalize").open = true;
  if (!$("#name").value.trim()) {
    $("#selection").textContent =
      "Conta seu nome para personalizar a mensagem.";
    $("#name").focus();
    return;
  }
  if (
    $("#service").value === "Outra ideia / minha referência" &&
    !$("#custom-service").value.trim()
  ) {
    $("#custom-service").focus();
    $("#selection").textContent = "Descreva sua referência para a Evy.";
    return;
  }
  updateMessage();
  if (!$("#message").value.trim()) {
    $("#message").focus();
    $("#selection").textContent = "Escreva sua mensagem antes de continuar.";
    return;
  }
  $("#final-message").value = $("#message").value;
  $("#booking-form").hidden = true;
  $("#result").hidden = false;
  $("#copy-status").textContent = "";
  $("#copy").focus();
};
$("#copy").onclick = async () => {
  if (!$("#final-message").value.trim()) {
    $("#copy-status").textContent = "Escreva sua mensagem antes de copiar.";
    $("#final-message").focus();
    return;
  }
  try {
    await navigator.clipboard.writeText($("#final-message").value);
    $("#copy-status").textContent = "Copiou! Agora cole na conversa com a Evy.";
  } catch {
    $("#final-message").select();
    $("#copy-status").textContent =
      "Selecione e copie o texto acima para enviar à Evy.";
  }
};
$("#restart").onclick = () => {
  $("#message").value = $("#final-message").value;
  messageEdited = true;
  $("#booking-form").hidden = false;
  $("#result").hidden = true;
  $("#service").focus();
};
let toastTimer;
function toast(text) {
  clearTimeout(toastTimer);
  $("#toast").textContent = text;
  $("#toast").hidden = false;
  toastTimer = setTimeout(() => ($("#toast").hidden = true), 4500);
}
$$("[data-service]").forEach(
  (b) =>
    (b.onclick = () => {
      $("#service").value = b.dataset.service;
      $("#custom-service").hidden = true;
      $("#booking-form").hidden = false;
      $("#result").hidden = true;
      updateSelection();
      updateMessage();
      $("#agenda").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "start",
      });
      toast(`${b.dataset.service} na sua ficha. Escolha o dia e o horário.`);
    }),
);
let likes = [];
try {
  const saved = JSON.parse(localStorage.getItem("evy-likes") || "[]");
  if (Array.isArray(saved)) likes = saved.filter((x) => typeof x === "string");
} catch {}
function syncLikes() {
  $$("[data-like]").forEach((b) => {
    const liked = likes.includes(b.dataset.like);
    b.setAttribute("aria-pressed", String(liked));
    b.innerHTML = liked ? "♥ <span>Salva</span>" : "♡ <span>Curti</span>";
  });
}
syncLikes();
$$("[data-like]").forEach(
  (b) =>
    (b.onclick = () => {
      const id = b.dataset.like;
      likes = likes.includes(id)
        ? likes.filter((x) => x !== id)
        : [...likes, id];
      try {
        localStorage.setItem("evy-likes", JSON.stringify(likes));
      } catch {}
      syncLikes();
      toast(
        likes.includes(id)
          ? "Referência salva nas suas favoritas neste navegador."
          : "Referência removida das favoritas.",
      );
    }),
);
$("#share-site").onclick = async () => {
  const url = "https://galpaodaevy.github.io/evybraids/";
  try {
    if (navigator.share) {
      await navigator.share({
        title: "Evy Braids · Agendamentos",
        text: "Da raiz pra cima. Bora combinar seu próximo visual com a Evy?",
        url,
      });
      $("#share-status").textContent = "Compartilhado.";
    } else {
      await navigator.clipboard.writeText(url);
      $("#share-status").textContent = "Link copiado. Agora é só compartilhar!";
    }
  } catch (e) {
    if (e.name !== "AbortError")
      $("#share-status").textContent =
        "Copie o endereço desta página para compartilhar.";
  }
};
renderCalendar();
renderTimes();
updateMessage();
