# handlebars-collectionquery
Handlebars helper for searching collections


## sample usage

Parameters
an collection (array of objects) you want to search
key: the object property you want to search on
value: what that key should equal
sortBy: optional sorting attribute
sortDir: optional sort order (asc, desc)

```html
<ul class="small-block-grid-1 medium-block-grid-2 large-block-grid-3">
  {{#collectionQuery navigation.main.items key='linkId' value='main-portfolio' sortBy='data.menu-sortdate' sortDir='desc'}}
    <li class="portfolio-item" data-linkid="{{linkId}}">
      <a href="{{{url}}}" >
        <img src="/img/portfolio/small/{{data.picture}}" alt="">
        {{{title}}}
      </a>
    </li>
  {{/collectionQuery}}
<ul>
```