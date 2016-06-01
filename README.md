# Angular Accordion

A simple, lightweight Angular.js 1.x plugin for Accordions and FAQs.

## Installation

Include script *after* the Angular library:

    bower install angular-accordion

Add script tag to your html file:

    <script src="/path/to/angular-accordion/dist/angular-accordion.min.js"></script>

Add angular-accordion as a dependency to your Angular module:

    angular.module('app', ['accordion']);

## Usage

Create appropriate HTML:

    <dl accordion mode="class" class="accordion">
        <dt>Accordion Title</dt>
            <dd>Lorem ipsum dolor sit amet.</dd>
        <dt class="open">Accordion Title</dt><!-- in "first" mode this will be open by default because of the open class, the others won't -->
            <dd>Lorem ipsum dolor sit amet.</dd>
        <dt>Accordion Title</dt>
            <dd>Lorem ipsum dolor sit amet.</dd>
        <dt>Accordion Title</dt>
            <dd>Lorem ipsum dolor sit amet.</dd>
        <dt>Accordion Title</dt>
            <dd>Lorem ipsum dolor sit amet.</dd>
    </dl>

*Note: your HTML must be a definition list (`<dl>`) with a `<dt>` for the title, heading or question (whatever you choose to call it) and a `<dd>` for the content or answer.*


### Pick a Mode (choose what gets opened by default)

- **class** - any `<dt>` with the class "open" will be open by default (`<dt class="open">Heading</dt>`); all other will be closed.
- **first** - the first item in the accordion will be open; all other will be closed.
- **solo** - like a classic accordion, only one item can be open at a time, the first item will be open by default; all other will be closed.
- **hash** * - any `<dt>` with a class which matches the address hash will be open by default; all other will be closed.

* To use hash mode, you will need to ensure that Angular is in `html5mode`. To make that happen, add the following snippet to your app:

```js
angular.module('app').config(function($locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});
```

### Examples

Please refer to the index.html file in this repo, it shows how to make all of the modes etc work.

## Development

- Source hosted at [GitHub](https://github.com/atwright147/angular-accordion)
- Report issues, questions, feature requests on [GitHub Issues](https://github.com/atwright147/angular-accordion/issues)

Pull requests are very welcome! Make sure your patches are well tested. Please create a topic branch for every separate change you make.

## Authors

[Andy Wright](https://github.com/atwright147)
