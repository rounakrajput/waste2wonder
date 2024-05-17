import Link from "next/link";
import React from "react";

function about() {
  return (
    <div class="w-full flex flex-col sm:flex-row flex-wrap sm:flex-nowrap py-4 flex-grow">
      <div class="w-fixed w-full flex-shrink flex-grow-0 px-4 ">
        <div class="sticky top-0 p-4 bg-gray-100 rounded-xl w-full h-full">
          <ul class="flex sm:flex-col overflow-hidden content-center justify-center">
            <li class="py-2 hover:bg-indigo-300 rounded">
              <Link class="truncate" href="/">
                <img
                  src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/home.svg"
                  class="w-7 sm:mx-2 mx-4 inline"
                />
                <span class="hidden sm:inline">Home</span>
              </Link>
            </li>

            <li class="py-2 hover:bg-indigo-300 rounded">
              <Link class="" href="/dashboard">
                <img
                  src="//cdn.jsdelivr.net/npm/heroicons@1.0.1/outline/chart-bar.svg"
                  class="w-7 sm:mx-2 mx-4 inline"
                />{" "}
                <span class="hidden sm:inline">Reports</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <main role="main" class="w-full flex-grow pt-1 px-3">
        <h1 class="text-3xl md:text-5xl mb-4 font-extrabold" id="home">
          The waste2wonder 
        </h1>
        <p class="py-2">
          Are you in search of this? In terms of Web design,{" "}
          <a
            class="text-indigo-600"
            href="https://en.wikipedia.org/wiki/Holy_grail_(web_design)"
          >
            the "holy grail" is page layout
          </a>{" "}
          that has 3 columns. It is commonly desired and implemented, but for
          many years, the various ways in which it could be implemented with
          available technologies all had drawbacks. Because of this, finding an
          optimal implementation was likened to searching for the elusive Holy
          Grail. As of 2021, the Holy Grail layout is implemented using CSS
          Flexbox or CSS Grid display. For this example, we're using the{" "}
          <a class="text-indigo-600" href="https://tailwindcss.com/">
            Tailwind CSS
          </a>{" "}
          utility framework. As part of it's default classes, Tailwind includes
          <a
            class="text-indigo-600"
            href="https://tailwindcss.com/docs/flex-direction"
          >
            Flexbox classes
          </a>{" "}
          which make this implementation possible. The holy grail example is
          also responsive so that the layout stacks vertically on smaller mobile
          screens.
        </p>
        <p class="py-2">
          Many web pages require a layout with multiple (often three) columns,
          with the main page content in one column (often the center), and
          supplementary content such as menus and advertisements in the other
          columns (sidebars). These columns commonly require separate
          backgrounds, with borders between them, and should appear to be the
          same height no matter which column has the tallest content. A common
          requirement is that the sidebars have a fixed width, with the center
          column adjusting in size to fill the window (fluid or liquid layout).
          Another requirement is that, when a page does not contain enough
          content to fill the screen, the footer should drop to the bottom of
          the browser window instead of leaving blank space underneath.
        </p>
        {/* <div class="flex p-3 bg-indigo-600 rounded text-white hidden md:flex">
          <span class="flex-shrink overflow-hidden whitespace-nowrap">
            &lt;--------
          </span>
          <div class="flex-grow flex-shrink-0 overflow-ellipsis text-center">
            This center column is "fluid" so it grows in width as needed!
          </div>
          <span class="flex-shrink overflow-hidden whitespace-nowrap">
            --------&gt;
          </span>
        </div> */}
      </main>
      <div class="w-fixed w-full flex-shrink flex-grow-0 px-2">
        <div class="flex sm:flex-col px-2">
          <div class="bg-gray-50 rounded-xl border mb-3 w-full">
            <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span class="block text-indigo-600">
                  Made with ❤️!
                </span>
              </h2>
            </div>
          </div>
          <div class="p-2"></div>
          <div class="bg-gray-100 rounded-xl mb-3 w-full">
            <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span class="block">Ready to dive in?</span>
              </h2>
            </div>
          </div>
          <div class="p-2"></div>
          <div class="bg-gray-50 rounded-xl border mb-3 w-full">
            <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:py-12 lg:px-8 lg:flex lg:items-center lg:justify-between">
              <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                <span class="block text-indigo-600">
                  Support environment restoration.
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default about;
