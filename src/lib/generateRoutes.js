const fs = require('fs');
const path = require('path');
const showdown = require('showdown');
const converter = new showdown.Converter({ noHeaderId: true });

// const { parse, HtmlGenerator } = require('latex.js')
// const { createHTMLWindow } = require('svgdom');

// global.window = createHTMLWindow()
// global.document = window.document

// const generator = new HtmlGenerator({
//   hyphenate: false,
// })

const appDirectory = path.join(__dirname, '../app');
const configDirectory = path.join(__dirname, '../config');

// Generated by AI
function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());
}

const beginning = `export default function getItems(pathname : String) {\nconst items = [\n`;
const end = `];\nreturn items;\n}`;
var itemsFile = "";
const emptyPage = `export default function main() {
return (
<div className="w-3/4"></div>
)
}`;

const defaultPage = `//!Gen
export default function Home() {
  return (
    <div className="w-screen flex justify-center">
      <h1>Welcome to Team334's FRC Guide</h1>
    </div>
  );
}`;

// subPath is the directory to check for main.txt, allowForEmpty checks if it should include an empty React component if main.txt is not found
async function generateReactFromText(subPath, allowForEmpty) {
  try {
    var page = `export default function main() {\nreturn (\n<div className="ml-10">\n`;
    let markdownFile = Bun.file(subPath + "\\main.md");
    let markdown = await markdownFile.text();
    // let doc = parse(markdown, { generator: generator }).htmlDocument();
    // const vals = Object.values(doc)[Object.values(doc).length - 2];
    // const markdownToHTML = doc.body.outerHTML.replace('class', 'className');
    // Extract content inside the <body> tag
    // const bodyContent = markdownToHTML.slice(6, markdownToHTML.length - 7);
    // console.log(bodyContent);
    // page += bodyContent;
    page += converter.makeHtml(markdown);
    page += `\n</div>\n)\n}`;
    await Bun.write(subPath + "/page.tsx", page);
  } catch {
    if (allowForEmpty) {
      await Bun.write(subPath + "/page.tsx", emptyPage);
    }
    return false;
  }
}

var navbarFile = `"use client";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  NavbarBrand
} from "@heroui/navbar";

import {
  Link
} from "@heroui/link";

import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { useState } from 'react';

import ThemeToggle from "./ui/themetoggle";

function Team334() {
  return (
    <img className="w-10 h-10 cursor-pointer rounded-xl hover:opacity-50 duration-500" onClick={() => {
      window.location.href = "https://github.com/Team334";
    }} src="https://avatars.githubusercontent.com/u/16625427?s=200&v=4"></img>
  )
}

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Link color="foreground" href="/">
          <b>FRC-Guides</b>
        </Link>`;

var endOfNavbarFile = `</NavbarContent>
<NavbarContent>
            <ThemeToggle></ThemeToggle>
            <NavbarBrand>
        <Team334 />
      </NavbarBrand>
      </NavbarContent>
            <NavbarMenu>`;

function navbarItem(text) {
  return `<NavbarItem>
                    <Link color="foreground" href="/${text.replace(/ /g, '-')}">
                        ${text}
                    </Link>
                </NavbarItem>`;
}

function navBarMenuItem(text) {
  return `<NavbarMenuItem key="${text}">
            <Link
              className="w-full"
              href="${text.replace(/ /g, '-')}"
              size="lg"
            >
              ${text}
            </Link>
          </NavbarMenuItem>`;
}

async function generateItemsArray(directory, exclusions) {
  const directories = getDirectories(directory);
  itemsFile += beginning;

  for (var i = 0; i < directories.length; i++) {
    const dir = directories[i];
    if (exclusions.includes(dir) == false) {
      navbarFile += navbarItem(dir.replace(/-/g, ' '));
      endOfNavbarFile += navBarMenuItem(dir.replace(/-/g, ' '));
    }
    const path = directory + '\\' + dir;
    let desiredPath = `/${dir.replace(/ /g, '%20')}`;
    itemsFile += `...(pathname.slice(0,${desiredPath.length}) === '${desiredPath}' ? `;
    var items = [];

    generateReactFromText(path, true);

    const subDirectories = getDirectories(path);
    if (subDirectories.length > 0) {
      // console.log(subDirectories);
      for (var z = 0; z < subDirectories.length; z++) {
        const subDir = subDirectories[z];
        const subPath = path + "\\" + subDir;
        const result = await generateReactFromText(subPath, false);
        if (result == false) {
          continue;
        }
        items.push({
          // Replace dashes in the sidebar title
          title: subDir.replace(/-/g, ' '),
          url: `${desiredPath}/${subDir}`,
          icon: null,
        });
      }
    } else {
      items.push({
        title: dir.charAt(0).toUpperCase() + dir.slice(1),
        url: desiredPath,
        icon: null,
      });
    }
    itemsFile += JSON.stringify(items, null, 2);
    itemsFile += ` : []),\n`;
  }
  itemsFile += end;
}

function dropdown(title, items) {
  // AI help
  const dropdownItems = items.map(item => {
    const href = `/${item.replace(/\s+/g, '-')}`;
    return `<DropdownItem key="${item}" href="${href}">${item}</DropdownItem>`;
  }).join('\n');
  return `
                    <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                                <Button
                        disableRipple
                        className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                        radius="sm"
                      >
                        ${title}
                      </Button>
                        </DropdownTrigger>
                        </NavbarItem>
                        <DropdownMenu aria-label="Static Actions"
            itemClasses={{
              base: "gap-4",
            }}>
                            ${dropdownItems}
                        </DropdownMenu>
                </Dropdown>`;
}

async function readFirstLine(filePath) {
  try {
    const file = Bun.file(filePath);
    const content = await file.text();
    const firstLine = content.split('\n')[0];
    return firstLine;
  } catch (error) {
    console.error('Error reading file:', error);
    return null;
  }
}

const dropdownConfig = Bun.file(configDirectory + "\\dropdowns.txt");
let dropdowns = await dropdownConfig.text();
dropdowns = dropdowns.split('\n');
var tempList = [];
var title = "";
var exclusionList = [];
for (var i = 0; i < dropdowns.length; i++) {
  if (dropdowns[i][0] == "~") {
    if (title != "") {
      navbarFile += dropdown(title, tempList);
      tempList.forEach((item) => {
        endOfNavbarFile += navBarMenuItem(item);
      })
      tempList = [];
    }
    title = dropdowns[i].slice(1, dropdowns[i].length);
  } else {
    tempList.push(dropdowns[i].replace(/\r/g, ''))
    exclusionList.push(dropdowns[i].replace(/\r/g, ''))
  }
}
navbarFile += dropdown(title, tempList);
tempList.forEach((item) => {
  endOfNavbarFile += navBarMenuItem(item);
})
await generateItemsArray(appDirectory, exclusionList);
endOfNavbarFile += `</NavbarMenu>
        </Navbar>
    )
}`;
navbarFile += endOfNavbarFile;
await Bun.write("./src/lib/items.ts", itemsFile);
await Bun.write('./src/components/navbar.tsx', navbarFile);
readFirstLine("./src/app/page.tsx").then(async (firstLine) => {
  if (firstLine != "//!Gen") {
    await Bun.write('./src/app/page.tsx', defaultPage);
  }
});