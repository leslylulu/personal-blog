const menuButton = document.querySelector<HTMLButtonElement>("#menu-button");
const mobileMenu = document.querySelector<HTMLElement>("#mobile-menu");

const setOpen = (open: boolean) => {
	menuButton?.setAttribute("aria-expanded", String(open));
	mobileMenu?.classList.toggle("max-h-0", !open);
	mobileMenu?.classList.toggle("opacity-0", !open);
	mobileMenu?.classList.toggle("max-h-72", open);
	mobileMenu?.classList.toggle("opacity-100", open);
};

menuButton?.addEventListener("click", () => {
	const isOpen = menuButton.getAttribute("aria-expanded") === "true";
	setOpen(!isOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => setOpen(false));
});

window.addEventListener("resize", () => {
	if (window.innerWidth >= 768) setOpen(false);
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") setOpen(false);
});
