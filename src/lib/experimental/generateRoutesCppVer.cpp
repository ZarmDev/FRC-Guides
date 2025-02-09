// GENERATED USING AI - USE CAUTION

#include <iostream>
#include <fstream>
#include <filesystem>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>

namespace fs = std::filesystem;

std::string beginning = "std::vector<Item> getItems(const std::string& pathname) {\nstd::vector<Item> items = {\n";
std::string end = "};\nreturn items;\n}";
std::string itemsFile = "";
std::string emptyPage = "void main() {\nstd::cout << \"<div class='w-3/4'></div>\";\n}";

struct Item {
    std::string title;
    std::string url;
    std::string icon;
};

std::vector<std::string> getDirectories(const std::string& srcPath) {
    std::vector<std::string> directories;
    for (const auto& entry : fs::directory_iterator(srcPath)) {
        if (entry.is_directory()) {
            directories.push_back(entry.path().filename().string());
        }
    }
    return directories;
}

void generateReactFromText(const std::string& subPath, bool allowForEmpty) {
    try {
        std::ifstream markdownFile(subPath + "/main.md");
        if (!markdownFile.is_open()) {
            throw std::runtime_error("File not found");
        }
        std::stringstream buffer;
        buffer << markdownFile.rdbuf();
        std::string markdown = buffer.str();
        std::string page = "void main() {\nstd::cout << \"<div class='ml-10'>\";\n";
        // Convert markdown to HTML (using a placeholder function here)
        std::string htmlContent = convertMarkdownToHtml(markdown);
        page += htmlContent;
        page += "\n</div>\n}\n";
        std::ofstream outFile(subPath + "/page.cpp");
        outFile << page;
    } catch (...) {
        if (allowForEmpty) {
            std::ofstream outFile(subPath + "/page.cpp");
            outFile << emptyPage;
        }
    }
}

std::string navbarFile = R"(
#include <iostream>
#include <vector>
#include <string>

void NavigationBar() {
    bool isMenuOpen = false;

    std::cout << "<Navbar isBordered isMenuOpen=" << isMenuOpen << " onMenuOpenChange=" << "setIsMenuOpen" << ">";
    std::cout << "<NavbarContent class='sm:hidden' justify='start'>";
    std::cout << "<NavbarMenuToggle aria-label=" << (isMenuOpen ? "Close menu" : "Open menu") << " />";
    std::cout << "</NavbarContent>";
    std::cout << "<NavbarContent class='hidden sm:flex gap-4' justify='center'>";
    std::cout << "<Link color='foreground' href='/'>";
    std::cout << "<b>FRC-Guides</b>";
    std::cout << "</Link>";
)";

std::string endOfNavbarFile = R"(
</NavbarContent>
<NavbarContent>
    <ThemeToggle></ThemeToggle>
    <NavbarBrand>
        <Team334 />
    </NavbarBrand>
</NavbarContent>
<NavbarMenu>
)";

std::string navbarItem(const std::string& text) {
    return "<NavbarItem>\n<Link color='foreground' href='/" + text + "'>\n" + text + "\n</Link>\n</NavbarItem>";
}

std::string navBarMenuItem(const std::string& text) {
    return "<NavbarMenuItem key='" + text + "'>\n<Link class='w-full' href='" + text + "' size='lg'>\n" + text + "\n</Link>\n</NavbarMenuItem>";
}

void generateItemsArray(const std::string& directory, const std::vector<std::string>& exclusions) {
    std::vector<std::string> directories = getDirectories(directory);
    itemsFile += beginning;

    for (const auto& dir : directories) {
        if (std::find(exclusions.begin(), exclusions.end(), dir) == exclusions.end()) {
            navbarFile += navbarItem(dir);
            endOfNavbarFile += navBarMenuItem(dir);
        }
        std::string path = directory + "/" + dir;
        std::string desiredPath = "/" + dir;
        itemsFile += "...(pathname.substr(0," + std::to_string(desiredPath.length()) + ") == '" + desiredPath + "' ? ";
        std::vector<Item> items;

        generateReactFromText(path, true);

        std::vector<std::string> subDirectories = getDirectories(path);
        if (!subDirectories.empty()) {
            for (const auto& subDir : subDirectories) {
                std::string subPath = path + "/" + subDir;
                try {
                    generateReactFromText(subPath, false);
                    items.push_back({subDir, desiredPath + "/" + subDir, ""});
                } catch (...) {
                    continue;
                }
            }
        } else {
            items.push_back({dir, desiredPath, ""});
        }
        itemsFile += "{" + itemsToString(items) + "} : []),\n";
    }
    itemsFile += end;
}

std::string dropdown(const std::string& title, const std::vector<std::string>& items) {
    std::string dropdownItems;
    for (const auto& item : items) {
        std::string href = "/" + item;
        dropdownItems += "<DropdownItem key='" + item + "' href='" + href + "'>" + item + "</DropdownItem>\n";
    }
    return "<Dropdown>\n<NavbarItem>\n<DropdownTrigger>\n<Button disableRipple class='p-0 bg-transparent data-[hover=true]:bg-transparent' radius='sm'>\n" + title + "\n</Button>\n</DropdownTrigger>\n</NavbarItem>\n<DropdownMenu aria-label='Static Actions' itemClasses={{base: 'gap-4'}}>\n" + dropdownItems + "</DropdownMenu>\n</Dropdown>";
}

int main() {
    std::ifstream dropdownConfig("config/dropdowns.txt");
    std::stringstream buffer;
    buffer << dropdownConfig.rdbuf();
    std::string dropdowns = buffer.str();
    std::vector<std::string> dropdownLines;
    std::istringstream dropdownStream(dropdowns);
    std::string line;
    while (std::getline(dropdownStream, line)) {
        dropdownLines.push_back(line);
    }

    std::vector<std::string> tempList;
    std::string title;
    std::vector<std::string> exclusionList;
    for (const auto& dropdownLine : dropdownLines) {
        if (dropdownLine[0] == '~') {
            if (!title.empty()) {
                navbarFile += dropdown(title, tempList);
                for (const auto& item : tempList) {
                    endOfNavbarFile += navBarMenuItem(item);
                }
                tempList.clear();
            }
            title = dropdownLine.substr(1);
        } else {
            tempList.push_back(dropdownLine);
            exclusionList.push_back(dropdownLine);
        }
    }
    navbarFile += dropdown(title, tempList);
    for (const auto& item : tempList) {
        endOfNavbarFile += navBarMenuItem(item);
    }
    generateItemsArray("app", exclusionList);
    endOfNavbarFile += "</NavbarMenu>\n</Navbar>\n";
    navbarFile += endOfNavbarFile;

    std::ofstream itemsOutFile("src/lib/items.cpp");
    itemsOutFile << itemsFile;
    std::ofstream navbarOutFile("src/components/navbar.cpp");
    navbarOutFile << navbarFile;

    return 0;
}