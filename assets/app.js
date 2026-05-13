import './stimulus_bootstrap.js';
import { shouldPerformTransition, performTransition } from "turbo-view-transitions";

import './styles/app.css';
// import alienGreeting from './lib/alien-greeting.js';

// alienGreeting("Give us all your cakes");


console.log('This log comes from assets/app.js - welcome to AssetMapper! 🎉');

let skipNextRenderTransition = false;

document.addEventListener("turbo:before-render", (event) => {
    if (shouldPerformTransition() && !skipNextRenderTransition) {
        event.preventDefault();

        performTransition(document.body, event.detail.newBody, async () => {
            await event.detail.resume();
        });
    }
});

document.addEventListener("turbo:load", () => {
    // View Transitions don't play nicely with Turbo cache
    // if (shouldPerformTransition()) Turbo.cache.exemptPageFromCache();
});

document.addEventListener("turbo:before-frame-render", (event) => {
    if (shouldPerformTransition() && !event.target.hasAttribute('data-skip-transition')) {
        event.preventDefault();

        skipNextRenderTransition = true;

        setTimeout(() => {
            skipNextRenderTransition = false;
        }, 1000);

        performTransition(event.target, event.detail.newFrame, async () => {
            await event.detail.resume();
        });
    }
});
