# Content Contributor Guide

## Overview
Are you interested in writing content for the SFUCO website (or are being forced to)? Then this guide is for you! Note that this guide only covers how to *create* posts. If you're looking for help on how to publish/remove/edit posts, see the [Content Management Guide]()!

## Sections
- Getting Started
- Creating Your Own Posts
 - Naming
 - Metadata
 - Writing the Content
 - Previewing Your Post
 - Getting Your Post On the Website
- *Aside*: How the sfuco.ca content works / "Why do I have to use a text editor"

## Getting Started
You'll need the following to work with the content on the website:
- A **text editor**. While you can technically use the built-in notepad on your computer, it won't be a pretty experience. Some free and better ones are listed below:
 - [Atom](https://atom.io/)
 - [VS Code](https://code.visualstudio.com/)

## Creating Your Own Posts
### Naming
In order for posts to be recognized, they *must* adhere to the following **naming convention**:

` **yyyy-mm-dd-title.md** `

An example filename is `2018-01-01-mypost.md`.

### Metadata
Every post begins with [YAML Front Matter](https://jekyllrb.com/docs/frontmatter/). This contains the metadata the website needs to be able to know such as what the title is, and what kind of post it is. The YAML Front Matter section consists of a set of variables and the corresponding values assigned to them. This section is enclosed by a pair of `---`. Below is the YAML Front Matter for the X: Part I Concert Post:

![X1 YAML Example](https://github.com/sfuco/sfuco/github.io/docs/img/yaml_example.png)

YAML Front Matter example. Note the opening and closing `---`

Posts on sfuco.ca use the following five YAML variables:

- `title`: The post title
- `category`: Determines where the post will show up. Standard categories are as follows:
 - *news*: Shows up on the news page (if recent, will also show up on **latest news** section on the front page)
 - *feature*: Shows up on the front page **upcoming concert** section
- `img`: Filename of the image to be used as the thumbnail/header for the post [Note: Only specify the filename (e.g. `img.jpg`) not the full path to the image]
- `layout`: Determines the layout of the full post page
- `summary`: The text that gets shown on the links to the full post

[**Important**: If you need to use apostrophes or colons in any of the above, enclose all the text in " " (e.g. `title`: "A Midsummer Night's Dream")]

### Writing the Content
Writing content is easy! Just start typing away below the YAML Front Matter's closing `---`. Everything you type here will show up in the post's body on the webpage. Need to format your content? Markdown files have special (and easy!) syntax to help you add formatting to your post. This [cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet) has most of the syntax that you should need!

### Previewing Your Post
If you've formatted your post with Markdown syntax, you generally won't be able to see what it will actually look like until it's rendered by a browser. To see your formatting in action, you can copy the body (everything below the YAML Front Matter) of your post into [this website](http://markdownlivepreview.com/).

Alternatively, if you're using one of the text editors listed above, here are some plugins/tools you can add that will let you view your rendered Markdown files in real time:
- **Atom**: [Markdown Preview](https://atom.io/packages/markdown-preview)
- **VS Code** [Markdown Preview Guide (it's already built in)](https://code.visualstudio.com/docs/languages/markdown#_markdown-preview)

### Getting Your Post On the Website
When you've finished writing your post, just send it over to one of the SFUCO website managers who'll be able to post it on the website for you. If you happen to be one of the website managers yourself, you can move on to the [Content Management Guide]().

---

## *Aside*: How the sfuco.ca content works / "Why do I have to use a text editor"
Virtually all of the content on the website is stored in [markdown](https://en.wikipedia.org/wiki/Markdown) files. These are basically simple text files that allow for metadata and formatting through specific syntax. The best way to work with plain text files such as these is through text editors. Here's one of the markdown files for one of the posts on the website:

![X1 Example](https://github.com/sfuco/sfuco/github.io/docs/img/markdown_example.png)

Not too complicated, huh? When someone goes through the website and clicks the link for that post, their web browser will receive the markdown file above and process it. Here's what they'll end up seeing after all that:

![X1 Post Example](https://github.com/sfuco/sfuco/github.io/docs/img/news_post_example.png)

You might be asking why you couldn't just use something like Microsoft Word. The problem with Word is that it's a word *processor*. Word processors provide a lot of functionality for composing documents and to keep things tidy, they encode a lot of special metadata in the background. A lot of this metadata stored in word documents/files can actually only be used by word processors (which is why you can't open a .doc/.docx file on just *any* computer)! So if you hand a word document to the website, it wouldn't be able to understand it.

**[Note: This doesn't mean that you can't use a word processor to *compose* the text in your post, it just means you'll have to transfer everything you wrote to a plain text file for the website to understand it]**

When working with a *text editor*, the text that you type on screen is pretty much just that. When a computer reads the file, it just sees codes that represent the letters in the file (See [ASCII](https://en.wikipedia.org/wiki/ASCII) or [Unicode](https://en.wikipedia.org/wiki/Unicode) if you're interested). Unlike a word document, a word processor doesn't contain additional encoded information specifying formatting (e.g. whether a word is bold or not).
