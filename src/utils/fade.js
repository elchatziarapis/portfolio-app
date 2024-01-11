/**
 * Fade in variant .
 * @param {string} direction left | right | up | down
 * @param {string} type spring | tween | inertia
 * @param {float} delay Time needed to start the animation.
 * @param {float} duration Time needed to finish the animation.
 * @param {float} duration Time needed to finish the opacity property.
 */
export const FADE_IN = (direction, type, delay, duration, opacityDuration = 0.6) => {
    const { x, y } = {
        left: { x: 200, y: 0 },
        right: { x: -200, y: 0 },
        up: { x: 0, y: 200 },
        down: { x: 0, y: -200 },
    }[direction] || { x: 0, y: 0 };

    return {
        hidden: {
            x,
            y,
           opacity: 0,
        },
        visible: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                type,
                delay,
                duration,
                ease: 'easeOut',
                opacity: {
                    duration:opacityDuration,
                }
            },
        },
    };
};