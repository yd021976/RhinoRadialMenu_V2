(function () {
  const defaultTab = "documentation";
  const buttons = Array.from(document.querySelectorAll(".tab-button"));
  const panels = Array.from(document.querySelectorAll(".tab-panel"));
  const validTabs = new Set(buttons.map((button) => button.dataset.tab));
  const documentationPanel = document.getElementById("panel-documentation");
  const docNavLinks = Array.from(document.querySelectorAll(".documentation-nav a"));
  const docSections = docNavLinks
    .map((link) => {
      const target = link.getAttribute("href");
      return target ? document.querySelector(target) : null;
    })
    .filter(Boolean);
  let isDocSyncScheduled = false;

  function setActiveDocLink(id) {
    docNavLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
    });
  }

  function getActiveDocSectionId() {
    if (!documentationPanel || documentationPanel.hidden || docSections.length === 0) {
      return null;
    }

    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const activationLine = Math.max(72, Math.min(viewportHeight * 0.12, 96));
    const lastSection = docSections[docSections.length - 1];
    const lastSectionRect = lastSection.getBoundingClientRect();
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

    if (lastSectionRect.top <= viewportHeight * 0.42 || nearBottom) {
      return lastSection.id;
    }

    let activeSection = docSections[0];

    docSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= activationLine) {
        activeSection = section;
      }
    });

    return activeSection.id;
  }

  function syncDocLinkToViewport() {
    const activeSectionId = getActiveDocSectionId();
    if (activeSectionId) {
      setActiveDocLink(activeSectionId);
    }
  }

  function requestDocSync() {
    if (isDocSyncScheduled) {
      return;
    }

    isDocSyncScheduled = true;
    window.requestAnimationFrame(function () {
      isDocSyncScheduled = false;
      syncDocLinkToViewport();
    });
  }

  function setActiveTab(tab, updateHash) {
    const nextTab = validTabs.has(tab) ? tab : defaultTab;

    buttons.forEach((button) => {
      const isActive = button.dataset.tab === nextTab;
      button.setAttribute("aria-selected", isActive ? "true" : "false");
      button.tabIndex = isActive ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isActive = panel.dataset.panel === nextTab;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    if (updateHash) {
      const nextHash = "#" + nextTab;
      if (window.location.hash !== nextHash) {
        history.replaceState(null, "", nextHash);
      }
    }

    if (nextTab === "documentation") {
      requestDocSync();
    }
  }

  function syncFromHash() {
    const hash = window.location.hash.slice(1);

    if (validTabs.has(hash)) {
      setActiveTab(hash, false);
      return;
    }

    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        const parentPanel = section.closest(".tab-panel");
        if (parentPanel && parentPanel.dataset.panel) {
          setActiveTab(parentPanel.dataset.panel, false);
          if (parentPanel.dataset.panel === "documentation") {
            setActiveDocLink(hash);
          }
          return;
        }
      }
    }

    setActiveTab(defaultTab, false);
    requestDocSync();
  }

  buttons.forEach((button, index) => {
    button.addEventListener("click", function () {
      setActiveTab(button.dataset.tab, true);
    });

    button.addEventListener("keydown", function (event) {
      let nextIndex = index;

      if (event.key === "ArrowRight") {
        nextIndex = (index + 1) % buttons.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (index - 1 + buttons.length) % buttons.length;
      } else if (event.key === "Home") {
        nextIndex = 0;
      } else if (event.key === "End") {
        nextIndex = buttons.length - 1;
      } else {
        return;
      }

      event.preventDefault();
      buttons[nextIndex].focus();
      setActiveTab(buttons[nextIndex].dataset.tab, true);
    });
  });

  docNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetId = link.getAttribute("href").slice(1);
      setActiveTab("documentation", false);
      setActiveDocLink(targetId);
    });
  });

  window.addEventListener("scroll", requestDocSync, { passive: true });
  window.addEventListener("resize", requestDocSync);
  window.addEventListener("hashchange", syncFromHash);
  syncFromHash();
}());
