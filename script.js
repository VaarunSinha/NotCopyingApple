const html = document.documentElement; // Getting the HTML document for later use

const canvas = document.getElementById("hero-section"); // Getting Canvas Element For Drawing Images etc...

const context = canvas.getContext("2d"); // Getting context of the canvas to be able to draw the images

// ANCHOR: Setting Width And Height

canvas.width = 1158;
canvas.height = 770;

// Apple uses a naming convention like 0000.jpg 0001.jpg etc.. so in order to grab the 148 images this is used as hard coding, will be tedious and repetitive.

//ANCHOR: Current  Frame Method

const currentFrame = index => (
    `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`

    //To String method as the the index will be a number.

    //using padStart(4, '0') to prepend zeros in front of our index until we reach four digits to match our file names. So, for example, passing 1 into this function will return 0001.
)


//Preloading the Images This way, each frame is already downloaded, making the transitions that much faster, and the animation that much smoother!

//ANCHOR: Preload Image Method
const preloadImages = () => {

    //For loop till 148 Images

    for (let i = 1; i < 148; i++) {
        const image = new Image();
        image.src = currentFrame(i);
    }
};

////ANCHOR: Image Object
//Creating a new Image Object to later Draw on the Canvas

const image = new Image();
image.src = currentFrame(1);

// When the image loads, draw the image. this is done if you use this property.

image.onload = function () {
    context.drawImage(image, 0, 0);
}

//Scrolling Event Listener for displaying the Images depending on the scroll.

//ANCHOR: EvetListenr for Scroll
window.addEventListener('scroll', () => {
    //Getting Scroll Top, Setting The maximum scrolling which user can do.

    const scrollTop = html.scrollTop;

    const maxScroll = html.scrollHeight - window.innerHeight;

    const scrollFraction = scrollTop / maxScroll;

    //Like dividing scroll in 148 parts if user scrolls then he will see the image corresponding to the part ie 148.

    const frameIndex = Math.min(147, Math.floor(scrollFraction * 148));

    //Then we need to turn that scroll progress into an index number that corresponds with the image numbering sequence for us to return the correct image for that position. We can do this by multiplying the progress number by the number of frames (images) we have. We’ll use Math.floor() to round that number down and wrap it in Math.min() with our maximum frame count so it never exceeds the total number of frames.

    requestAnimationFrame(() => updateImage(frameIndex + 1))

    //requestAnimationFrame takes a callback argument, so we’ll pass a function that will update the image source and draw the new image on the <canvas>:
})


////ANCHOR: Update Image Method
//Updating Image Based On frameIndex.
const updateImage = index => {
    image.src = currentFrame(index);
    context.drawImage(image, 0, 0)
}

//Preloading Images
preloadImages()