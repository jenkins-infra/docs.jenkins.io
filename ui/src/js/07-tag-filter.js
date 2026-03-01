/* global localStorage */
;(function () {
  'use strict'

  var tagFilter = document.querySelector('.tag-filter')
  if (!tagFilter) return

  var toggle = tagFilter.querySelector('.tag-filter-toggle')
  var dropdown = tagFilter.querySelector('.tag-filter-dropdown')
  var tagItems = tagFilter.querySelectorAll('.tag-filter-item')
  var navMenu = document.querySelector('.nav-panel-menu .nav-menu')

  var tagUrlMappings = {
    'getting-started': 'getting-started/index.html',
    pipeline: 'pipeline/index.html',
    security: 'security/index.html',
    plugins: 'managing/plugins.html',
    administration: 'managing/index.html',
    installation: 'installing-jenkins/index.html',
    configuration: 'managing/system-configuration.html',
    troubleshooting: 'troubleshooting/index.html',
  }

  toggle.addEventListener('click', function (e) {
    e.stopPropagation()
    toggleDropdown()
  })

  tagItems.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.stopPropagation()
      var tag = this.getAttribute('data-tag')
      selectTag(tag)
      closeDropdown()
    })
  })

  document.addEventListener('click', function (e) {
    if (!tagFilter.contains(e.target)) {
      closeDropdown()
    }
  })

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeDropdown()
    }
  })

  function toggleDropdown () {
    var isOpen = dropdown.classList.contains('is-open')
    if (isOpen) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }

  function openDropdown () {
    dropdown.classList.add('is-open')
    toggle.classList.add('is-active')
    toggle.setAttribute('aria-expanded', 'true')
  }

  function closeDropdown () {
    dropdown.classList.remove('is-open')
    toggle.classList.remove('is-active')
    toggle.setAttribute('aria-expanded', 'false')
  }

  function selectTag (tag) {
    tagItems.forEach(function (item) {
      var itemTag = item.getAttribute('data-tag')
      if (itemTag === tag) {
        item.classList.add('is-active')
      } else {
        item.classList.remove('is-active')
      }
    })

    if (tag === 'all') {
      tagFilter.classList.remove('has-active-filter')
      navigateToIndex()
    } else {
      tagFilter.classList.add('has-active-filter')
      navigateToTag(tag)
      highlightNavSection(tag)
    }

    saveTagPreference(tag)
  }

  function navigateToTag (tag) {
    var targetPath = tagUrlMappings[tag]
    if (!targetPath) return

    var currentUrl = window.location.href
    var basePath = getBasePath(currentUrl)

    if (basePath) {
      var newUrl = basePath + targetPath
      if (newUrl !== currentUrl) {
        window.location.href = newUrl
      }
    }
  }

  function getBasePath (url) {
    var match = url.match(/(.*\/user-docs\/[^/]+\/)/)
    if (match) {
      return match[1]
    }
    match = url.match(/(.*\/dev-docs\/)/)
    if (match) {
      return match[1]
    }
    match = url.match(/(.*\/tutorials\/[^/]+\/)/)
    if (match) {
      return match[1]
    }
    var lastSlash = url.lastIndexOf('/')
    if (lastSlash > 0) {
      return url.substring(0, lastSlash + 1)
    }
    return null
  }

  function highlightNavSection (tag) {
    if (!navMenu) return

    var targetPath = tagUrlMappings[tag]
    if (!targetPath) return

    var navLinks = navMenu.querySelectorAll('.nav-link')
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || ''
      var parentItem = link.closest('.nav-item')

      if (href.indexOf(targetPath) !== -1 || targetPath.indexOf(href) !== -1) {
        if (parentItem) {
          parentItem.classList.add('is-active')
          expandParents(parentItem)
        }
      }
    })
  }

  function expandParents (item) {
    var parent = item.parentElement
    while (parent && !parent.classList.contains('nav-menu')) {
      if (parent.classList.contains('nav-item')) {
        parent.classList.add('is-active')
      }
      parent = parent.parentElement
    }
  }

  function navigateToIndex () {
    var currentUrl = window.location.href
    var basePath = getBasePath(currentUrl)

    if (basePath) {
      var indexUrl = basePath + 'index.html'
      if (currentUrl !== indexUrl) {
        window.location.href = indexUrl
      }
    }
  }

  function saveTagPreference (tag) {
    try {
      localStorage.setItem('jenkins-docs-tag-filter', tag)
    } catch (e) {
      // localStorage not available
    }
  }

  function updateActiveTagFromUrl () {
    var currentUrl = window.location.href

    for (var tag in tagUrlMappings) {
      if (Object.prototype.hasOwnProperty.call(tagUrlMappings, tag)) {
        var path = tagUrlMappings[tag]
        if (currentUrl.indexOf(path.replace('index.html', '')) !== -1 ||
            currentUrl.indexOf(path) !== -1) {
          tagItems.forEach(function (item) {
            var itemTag = item.getAttribute('data-tag')
            if (itemTag === tag) {
              item.classList.add('is-active')
              tagFilter.classList.add('has-active-filter')
            } else if (itemTag !== 'all') {
              item.classList.remove('is-active')
            }
          })
          var allItem = tagFilter.querySelector('[data-tag="all"]')
          if (allItem) {
            allItem.classList.remove('is-active')
          }
          return
        }
      }
    }

    var defaultAllItem = tagFilter.querySelector('[data-tag="all"]')
    if (defaultAllItem) {
      defaultAllItem.classList.add('is-active')
    }
    tagFilter.classList.remove('has-active-filter')
  }

  updateActiveTagFromUrl()
})()
