const ionic = {
  globalAnimation: () => {
    /**
     * Sets animation-related attributes on an element.
     *
     * @param {HTMLElement} element - The element to set attributes on.
     * @param {Object} config - Configuration object containing animation settings.
     * @param {number} index - The index of the element (used for delay calculations).
     * @param {boolean} isComponent - Whether the element is a component or a child element.
     */
    const setAnimationAttributes = (element, config, index = 0, isComponent = false) => {
      const attributes = {
        "data-animation": isComponent
          ? config.moduleAnimation
          : config.elementAnimation || "fade-in", // Use moduleAnimation for components, otherwise elementAnimation
        "data-animation-duration": config.defaultDuration || 600, // Default animation duration (600ms)
        "data-animation-delay": Math.min(config.defaultDelay * (index + 1), 1000) || 200, // Delay increases with index, capped at 1000ms, default 200ms
      };

      // Apply animation attributes only if they are not already set
      Object.keys(attributes).forEach((attr) => {
        if (!element.hasAttribute(attr)) {
          element.setAttribute(attr, attributes[attr]);
        }
      });
    };

    /**
     * Removes animation attributes from child elements.
     *
     * @param {HTMLElement} element - The parent element whose children need attribute removal.
     */
    const removeChildAnimationAttributes = (element) => {
      element.querySelectorAll("[data-animate]:not(.animate)").forEach((child) => {
        [
          "data-animate",
          "data-animation",
          "data-animation-duration",
          "data-animation-delay",
        ].forEach((attr) => child.removeAttribute(attr)); // Remove all animation-related attributes
      });
    };

    /**
     * Initializes animations by setting attributes on components and their children.
     *
     * @param {Object} config - Configuration object containing animation settings.
     */
    const initializeAnimations = (config) => {
      document.querySelectorAll("[data-component-animation]").forEach((component) => {
        component.setAttribute("data-animate", ""); // Mark component for animation
        setAnimationAttributes(component, config, 0, true); // Apply animation settings to the component

        component.querySelectorAll("[data-animate]:not(.animate)").forEach((element, index) => {
          if (element.hasAttribute("data-disable-child-animation")) {
            removeChildAnimationAttributes(element); // Remove animation attributes from child elements if disabled
          }
          setAnimationAttributes(element, config, index); // Apply animation settings to child elements
        });
      });
    };

    /**
     * Observes elements and triggers animations when they enter the viewport.
     */
    const observeAnimations = () => {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add(
                "animate",
                `animate--${entry.target.getAttribute("data-animation")}`
              ); // Add animation classes
              obs.unobserve(entry.target); // Stop observing once animated
            }
          });
        },
        { threshold: 0.25 }
      ); // Trigger animation when 25% of element is visible

      document
        .querySelectorAll("[data-animate]:not(.animate)")
        .forEach((element) => observer.observe(element));
    };

    // Initialize and observe animations
    initializeAnimations(animationConfig);
    observeAnimations();

    // header search
    const searchTriggers = document.querySelectorAll("[data-search-trigger]");

    if (searchTriggers.length) {
      searchTriggers.forEach((trigger) => {
        const searchHeadButton = trigger.closest(".search-head-button");
        const searchBox = searchHeadButton?.nextElementSibling;
        const searchClose = searchBox?.querySelector("[data-serach-close]");
        if (searchBox) {
          searchBox.style.opacity = "0";
          searchBox.style.visibility = "hidden";
          searchBox.style.transition = "opacity 0.3s ease";
          trigger.addEventListener("click", (e) => {
            e.preventDefault();
            const isVisible = searchBox.style.visibility === "visible";
            if (isVisible) {
              searchBox.style.opacity = "0";
              searchBox.style.visibility = "hidden";
            } else {
              searchBox.style.opacity = "1";
              searchBox.style.visibility = "visible";
            }
          });
          if (searchClose) {
            searchClose.addEventListener("click", (e) => {
              e.preventDefault();
              searchBox.style.opacity = "0";
              searchBox.style.visibility = "hidden";
            });
          }
          document.addEventListener("click", (e) => {
            if (!searchHeadButton.contains(e.target) && !searchBox.contains(e.target)) {
              searchBox.style.opacity = "0";
              searchBox.style.visibility = "hidden";
            }
          });
        }
      });
    }
  },
  counterAnimation() {
    // Select all elements with [data-counter] attribute that do not have the "counted" class
    const counterElements = document.querySelectorAll("[data-counter]:not(.counted)");

    // Ensure that the counter animation only runs if the body does not have the "ip3-edit" class
    if (!document.body.classList.contains("ip3-edit") && counterElements.length) {
      // Create an Intersection Observer to track when elements come into view
      const interaction = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            // Check if the element is visible in the viewport
            if (entry.intersectionRatio > 0) {
              // Start counter animation from 0 to the target number over 2 seconds (2000ms)
              counterAnimation(entry.target, 0, entry.target.textContent, 2000);

              // Stop observing the element after animation starts
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.25 } // Trigger animation when at least 25% of the element is visible
      );

      // Observe each counter element that hasn't been counted yet
      counterElements.forEach((obs) => {
        if (!obs.classList.contains("counted")) {
          interaction.observe(obs);
        }
      });
    }

    /**
     * Animates a numerical counter inside an element.
     *
     * @param {HTMLElement} obj - The target element where the counter animation occurs.
     * @param {number} start - The starting number of the counter.
     * @param {string | number} end - The final number (can be a string with special characters).
     * @param {number} duration - The duration of the animation in milliseconds.
     */
    function counterAnimation(obj, start, end, duration) {
      let startTimestamp = null;

      // Check if the target number contains non-alphanumeric characters (e.g., commas)
      const isNumberWithSpecialChar = /[^A-Za-z0-9]/.test(end);

      // Convert the target number to an integer if it contains special characters
      const parsedEnd = isNumberWithSpecialChar ? parseFloat(end.replace(/,/g, ""), 10) : end;

      const isDecimalValue = parsedEnd % 1 !== 0;

      // Function to execute each frame of the animation
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp; // Capture the start time
        const progress = Math.min((timestamp - startTimestamp) / duration, 1); // Calculate progress (0 to 1)

        // Calculate the current value based on progress
        const currentValue = progress * (parsedEnd - start) + start;

        // Format the value with a number formatter if it originally contained special characters
        obj.innerHTML = isNumberWithSpecialChar
          ? new Intl.NumberFormat().format(
              isDecimalValue ? Math.abs(currentValue).toFixed(2) : Math.floor(currentValue)
            )
          : isDecimalValue
            ? Math.abs(currentValue).toFixed(2)
            : Math.floor(currentValue);

        // Continue the animation until progress reaches 1 (100%)
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      // Start the animation loop
      window.requestAnimationFrame(step);
    }
  },
  backToTop: () => {
    let lastScrollTop = 0; // Stores the last scroll position

    /**
     * Handles scroll events to update page state based on scroll direction.
     */
    window.addEventListener("scroll", () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const pageBody = document.querySelector("body:not(.ip3-edit)");

      if (!pageBody) return; // Exit if body element is not found

      pageBody.classList.remove("page-up", "page-down", "page-top");

      if (scrollTop > lastScrollTop) {
        pageBody.classList.add("page-down"); // Scrolling down
      } else if (scrollTop === 0) {
        pageBody.classList.add("page-top"); // At the top of the page
      } else {
        pageBody.classList.add("page-up"); // Scrolling up
      }

      lastScrollTop = Math.max(scrollTop, 0); // Ensure scroll position is never negative
    });

    /**
     * Adds click event to the back-to-top button for smooth scrolling.
     */
    document.querySelector("[data-back-to-top]")?.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll to top
    });
  },
  skipToMain: () => {
    // Exit early if the page is in edit mode
    if (document.body.classList.contains("ip3-edit")) return;

    /**
     * Handles focus and blur events for "Skip to Main Content" links.
     * When focused, it makes the parent container visible.
     * When blurred, it hides the parent container.
     */
    document.querySelectorAll(".skip-to-main").forEach((element) => {
      const parent = element.parentElement;

      element.addEventListener("focus", () => {
        parent?.classList.add("visible");
        parent?.classList.remove("invisible");
      });

      element.addEventListener("blur", () => {
        parent?.classList.remove("visible");
        parent?.classList.add("invisible");
      });
    });
  },
  redirectFrom404: () => {
    // Exit early if not on the 404 error page or in edit mode
    if (document.body.id !== "ip3-error-page" || document.body.classList.contains("ip3-edit"))
      return;

    const counterElement = document.querySelector(".counter");
    if (!counterElement) return; // Exit if counter element is not found

    let counterValue = parseInt(counterElement.textContent, 10);

    /**
     * Decrements the counter every second and updates the UI.
     * Redirects to the homepage when the counter reaches zero.
     */
    const countdown = setInterval(() => {
      counterValue -= 1;
      counterElement.textContent = counterValue.toString().padStart(2, "0"); // Ensures two-digit format

      if (counterValue <= 0) {
        clearInterval(countdown);
        window.location.href = `${window.location.origin}`;
      }
    }, 1000);
  },
  cardThemeToggle: () => {
    const cards = document.querySelectorAll("[data-card-theme-toggle]");
    const toggleCardTheme = (card) => {
      card.classList.toggle("card-light");
      card.classList.toggle("card-dark");
    };

    cards.forEach((card) => {
      card.addEventListener("mouseover", () => toggleCardTheme(card));
      card.addEventListener("mouseout", () => toggleCardTheme(card));
    });
  },
  init: () => {
    ionic.globalAnimation();
    ionic.counterAnimation();
    ionic.backToTop();
    ionic.skipToMain();
    ionic.redirectFrom404();
    ionic.cardThemeToggle();
  },
};
export default ionic;
  const animationConfig = {
    moduleAnimation: "fade-in",
    elementAnimation: "fade-in-top",
    defaultDuration: 600,
    defaultDelay: 100,
  };