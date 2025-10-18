# My First Video Game / Az Első Videojátékom

**Languages / Nyelvek:** [English](#english) | [Magyar](#magyar)

---

<a name="english"></a>

# English Version

## 1. Welcome!

Hi! This is your starter video game project where you can learn to code with help from Claude Code (an AI coding assistant).

Right now, the game shows a player character that you can move around using the arrow keys. But this is just the beginning - you can add enemies, power-ups, sounds, and so much more!

The best part? You don't need to know everything about coding. Claude Code will help you learn and build new features step by step.

## 2. Getting Your Game on Your Computer

To work on this game, you need to copy it from GitHub to your computer. Here's how:

### Step 1: Install Git

Git is a tool that helps you download and manage code projects.

**On Mac:**

1. Open "Terminal" (you can find it by pressing `Command + Space` and typing "Terminal")
2. Type this command and press Enter:
   ```
   git --version
   ```
3. If you don't have Git, your Mac will ask if you want to install it. Click "Install"!

**On Windows:**

1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download the installer
3. Run the installer and click "Next" for all the options (the defaults are fine!)

### Step 2: Clone (Download) the Game

"Cloning" means making a copy of the game on your computer.

1. Open your Terminal (Mac) or Command Prompt (Windows)
2. Decide where you want to save your game. For example, you might want to save it in your Documents folder
3. Type these commands one at a time:
   ```
   cd Documents
   git clone https://github.com/evatapai/oopvideogame.git
   ```
4. This will create a new folder called `oopvideogame` inside your Documents folder with all the game files!

### Step 3: Install VS Code (Your Code Editor)

Now you need a program to view and edit your code files. We'll use VS Code - it's free and very popular!

**What is VS Code?**
VS Code (Visual Studio Code) is like a super-powered text editor made specifically for writing code. It helps you see your files, edit them, and shows your code in nice colors to make it easier to read.

**How to Install VS Code:**

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com)
2. Click the big "Download" button
3. Install it just like any other program
4. Open VS Code after it's installed

**Opening Your Game in VS Code:**

1. Open VS Code
2. Click on "File" in the top menu
3. Click "Open Folder..."
4. Navigate to your Documents folder
5. Select the `oopvideogame` folder and click "Open"

Now you can see all your game files in the left sidebar! You can click on any file to open it and see the code.

## 3. Trying What We Have So Far

Let's get your game running! You'll need Node.js (a tool that runs JavaScript code).

### Step 1: Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the version that says "LTS" (Long Term Support)
3. Install it just like any other program

### Step 2: Install the Game Packages

Your game needs some extra tools to run. Let's install them:

1. Open your Terminal (Mac) or Command Prompt (Windows)
2. Go into your game folder:
   ```
   cd Documents/oopvideogame
   ```
3. Install the packages:
   ```
   npm install
   ```
   This might take a minute or two. It's downloading all the tools your game needs!

### Step 3: Start the Game!

1. In the same Terminal/Command Prompt, type:
   ```
   npm run dev
   ```
2. You should see a message like "Local: http://localhost:5173/"
3. Open your web browser (Chrome, Safari, Firefox, etc.)
4. Type this in the address bar: `localhost:5173`
5. Your game should appear! Try using the arrow keys or WASD to move the character around. Press the Space bar to attack!

**To see your changes:** After you make changes to the code with Claude's help, save the file and then refresh your browser (press `F5` or `Cmd+R` on Mac / `Ctrl+R` on Windows). The game will update with your new changes!

**To stop the game:** Press `Ctrl + C` in your Terminal/Command Prompt

## 4. Adding AI Power: Getting Started with Claude Code

Claude Code is like having a coding teacher right there with you! It can help you:

- Add new features to your game
- Fix bugs (problems in your code)
- Explain how things work
- Answer your coding questions

### Step 1: Install Claude Code

1. Go to [https://docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code)
2. Follow the installation instructions for your computer
3. You'll need to create an Anthropic account (it's free to try!)

## 5. Opening a Terminal and Starting Claude Code

Now let's use Claude Code to work on your game!

### Opening Terminal in Your Game Folder

**On Mac:**

1. Open Finder
2. Go to your Documents folder
3. Find the `oopvideogame` folder
4. Right-click (or Control + click) on the folder
5. Hold down the `Option` key and you'll see "Open in Terminal" - click it!

**On Windows:**

1. Open File Explorer
2. Go to your Documents folder
3. Find the `oopvideogame` folder
4. Right-click on the folder
5. Choose "Open in Terminal" or "Open Command Prompt here"

### Starting Claude Code

In your Terminal, type:

```
claude
```

Press Enter, and Claude Code will start! You can now type questions or ask Claude to help you add features to your game.

### Example Things to Ask Claude:

- "Can you help me add an enemy character to the game?"
- "How do I make my character jump?"
- "Can you add a score counter?"
- "Why isn't my game working?"
- "Can you explain what this code does?" (and then select some code)

## 6. Want to Talk Instead of Type?

If you'd rather speak to Claude than type, you can use Wispr Flow!

### Setting Up Wispr Flow

1. Go to [https://wisprflow.ai](https://wisprflow.ai)
2. Click "Download for free" and install it for your computer (Mac or Windows) or iPhone
3. Once installed, you can speak your questions and it will type them for you in Claude Code!

This is great if typing is hard, or if you want to explain your ideas by talking. Wispr Flow works in over 100 apps, including Claude Code!

## Need Help?

If you get stuck:

1. Ask Claude Code for help! That's what it's there for.
2. Check if the game is running (did you do `npm run dev`?)
3. Make sure you're in the right folder (use `pwd` on Mac or `cd` on Windows to check where you are)

## Have Fun!

Remember: coding is all about trying things, making mistakes, and learning. Don't worry if something doesn't work the first time - that's how everyone learns to code!

Happy coding!

---

<a name="magyar"></a>

# Magyar Verzió

## 1. Üdvözlünk!

Szia! Ez egy kezdő videojáték projekt, ahol megtanulhatsz programozni a Claude Code (egy mesterséges intelligencia programozó asszisztens) segítségével.

A játékban jelenleg egy játékos karaktert látsz, akit a nyílbillentyűkkel tudsz mozgatni. De ez csak a kezdet - hozzáadhatsz meg tobb ellenséget, erősítéseket, hangokat, és még sok minden mást!

A legjobb az egészben? Nem kell mindent tudnod a programozásról. A Claude Code lépésről lépésre segít tanulni és új funkciókat építeni.

Ha elakadsz, semmi baj, ez teljesen normalis. Keresd meg a valaszt Google-ben, az AI-val, de vegso esetben en is segitek (Evi).

## 2. A Játék Letöltése a Számítógépedre

Ahhoz, hogy dolgozhass a játékon, át kell másolnod a GitHubról a saját számítógépedre. Így kell csinálni:

### 1. Lépés: Telepítsd a Git-et

A Git egy program, ami segít letölteni és kezelni a kódprojekteket.

**Mac-en:**

1. Nyisd meg a "Terminal" alkalmazást (megtalálod, ha megnyomod a `Command + Space` billentyűket és beírod, hogy "Terminal")
2. Írd be ezt a parancsot és nyomj Enter-t:
   ```
   git --version
   ```
3. Ha nincs Git a gépeden, a Mac megkérdezi, hogy szeretnéd-e telepíteni. Kattints a "Telepítés"-re!

**Windows-on:**

1. Menj erre a weboldalra: [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Töltsd le a telepítőt
3. Futtasd a telepítőt és kattints a "Következő"-re minden lépésnél (az alapbeállítások jók!)

### 2. Lépés: Klónozd le (Töltsd le) a Játékot

A "klónozás" azt jelenti, hogy lemásolod a játékot a saját számítógépedre.

1. Nyisd meg a Terminal-t (Mac) vagy a Parancssort (Windows)
2. Döntsd el, hová szeretnéd menteni a játékot. Például mentheted a Dokumentumok mappába
3. Írd be ezeket a parancsokat egyenként:
   ```
   cd Documents
   git clone https://github.com/evatapai/oopvideogame.git
   ```
4. Ez létrehoz egy új mappát `oopvideogame` néven a Dokumentumok mappádban, benne az összes játékfájllal!

### 3. Lépés: Telepítsd a VS Code-ot (A Kódszerkesztőd)

Most szükséged van egy programra, amivel megnézheted és szerkesztheted a kódfájljaidat. A VS Code-ot fogjuk használni - ingyenes és nagyon népszerű!

**Mi az a VS Code?**
A VS Code (Visual Studio Code) olyan, mint egy szuper-erős szövegszerkesztő, ami kifejezetten kódírásra készült. Segít látni a fájljaidat, szerkeszteni őket, és szép színekkel mutatja a kódodat, hogy könnyebb legyen olvasni.

**Hogyan telepítsd a VS Code-ot:**

1. Menj erre a weboldalra: [https://code.visualstudio.com](https://code.visualstudio.com)
2. Kattints a nagy "Download" gombra
3. Telepítsd, mint bármely más programot
4. Nyisd meg a VS Code-ot, miután települt

**A Játékod Megnyitása VS Code-ban:**

1. Nyisd meg a VS Code-ot
2. Kattints a "File" menüre felül
3. Kattints az "Open Folder..." opcióra
4. Navigálj a Dokumentumok mappádba
5. Válaszd ki az `oopvideogame` mappát és kattints az "Open" gombra

Most láthatod az összes játékfájlodat a bal oldali sávban! Kattinthatsz bármelyik fájlra, hogy megnyisd és lásd a kódot.

## 3. Próbáljuk ki, Ami Eddig Van

Indítsuk el a játékot! Szükséged lesz a Node.js-re (egy program, ami futtatja a JavaScript kódot).

### 1. Lépés: Telepítsd a Node.js-t

1. Menj erre a weboldalra: [https://nodejs.org](https://nodejs.org)
2. Töltsd le azt a verziót, amelyiken "LTS" (Long Term Support) felirat van
3. Telepítsd, mint bármely más programot

### 2. Lépés: Telepítsd a Játék Csomagjait

A játéknak szüksége van néhány extra eszközre, hogy működjön. Telepítsük őket:

1. Nyisd meg a Terminal-t (Mac) vagy a Parancssort (Windows)
2. Menj be a játék mappájába:
   ```
   cd Documents/oopvideogame
   ```
3. Telepítsd a csomagokat:
   ```
   npm install
   ```
   Ez eltarthat egy-két percig. Letölti az összes eszközt, amire a játékodnak szüksége van!

### 3. Lépés: Indítsd el a Játékot!

1. Ugyanabban a Terminal-ban/Parancssorban írd be:
   ```
   npm run dev
   ```
2. Látnod kell egy üzenetet, mint például: "Local: http://localhost:5173/"
3. Nyisd meg a webböngésződet (Chrome, Safari, Firefox, stb.)
4. Írd be ezt a címsorba: `localhost:5173`
5. A játékodnak meg kell jelennie! Próbáld meg a nyílbillentyűkkel vagy a WASD billentyűkkel mozgatni a karaktert. Nyomd meg a Szóköz billentyűt a támadáshoz!

**A változások megtekintéséhez:** Miután Claude segítségével módosítottál a kódon, mentsd el a fájlt, majd frissítsd a böngésződet (nyomd meg az `F5` gombot vagy `Cmd+R` Mac-en / `Ctrl+R` Windows-on). A játék frissül az új változtatásokkal!

**A játék leállításához:** Nyomd meg a `Ctrl + C` billentyűket a Terminal-ban/Parancssorban

## 4. AI Erő Hozzáadása: Kezdj el a Claude Code-dal

A Claude Code olyan, mintha egy programozó tanár lenne veled! Segíthet neked:

- Új funkciókat hozzáadni a játékodhoz
- Hibákat javítani (problémákat a kódodban)
- Elmagyarázni, hogyan működnek a dolgok
- Válaszolni a programozási kérdéseidre

### 1. Lépés: Telepítsd a Claude Code-ot

1. Menj erre a weboldalra: [https://docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code)
2. Kövesd a telepítési utasításokat a számítógépedhez
3. Létre kell hoznod egy Anthropic fiókot (ingyen ki lehet próbálni!)

## 5. Terminal Megnyitása és a Claude Code Indítása

Most használjuk a Claude Code-ot a játékodon való munkához!

### Terminal Megnyitása a Játék Mappájában

**Mac-en:**

1. Nyisd meg a Finder-t
2. Menj a Dokumentumok mappádba
3. Keresd meg az `oopvideogame` mappát
4. Jobb gombbal kattints (vagy Control + kattintás) a mappára
5. Tartsd lenyomva az `Option` billentyűt és megjelenik a "Megnyitás Terminalban" - kattints rá!

**Windows-on:**

1. Nyisd meg a Fájlkezelőt
2. Menj a Dokumentumok mappádba
3. Keresd meg az `oopvideogame` mappát
4. Jobb gombbal kattints a mappára
5. Válaszd a "Megnyitás Terminalban" vagy "Parancssor megnyitása itt" opciót

### Claude Code Indítása

A Terminalba írd be:

```
claude
```

Nyomj Enter-t, és a Claude Code elindul! Mostantól kérdezhetsz vagy kérheted Claude-ot, hogy segítsen funkciókat hozzáadni a játékodhoz.

### Példák, Amit Kérdezhetsz Claude-tól:

- "Tudnál segíteni hozzáadni egy ellenség karaktert a játékhoz?"
- "Hogyan tudom a karakteremet ugratni?"
- "Tudnál hozzáadni egy pontszámláló-t?"
- "Miért nem működik a játékom?"
- "El tudnád magyarázni, mit csinál ez a kód?" (és aztán jelölj ki valamilyen kódot)

## 6. Szeretnél Beszélni Gépelés Helyett?

Ha inkább beszélnél Claude-hoz, mint gépelni, használhatod a Wispr Flow-t!

### Wispr Flow Beállítása

1. Menj erre a weboldalra: [https://wisprflow.ai](https://wisprflow.ai)
2. Kattints a "Download for free" gombra és telepítsd a számítógépedre (Mac vagy Windows) vagy iPhone-ra
3. Ha telepítve van, beszélhetsz a kérdéseidről és begépeli neked a Claude Code-ban!

Ez remek, ha a gépelés nehéz, vagy ha szeretnéd az ötleteidet beszélve elmagyarázni. A Wispr Flow több mint 100 alkalmazásban működik, beleértve a Claude Code-ot is!

## Kell Segítség?

Ha elakadtál:

1. Kérdezd meg Claude Code-ot segítségért! Azért van ott!
2. Ellenőrizd, hogy a játék fut-e (lefuttattad az `npm run dev` parancsot?)
3. Bizonyosodj meg róla, hogy a megfelelő mappában vagy (használd a `pwd` parancsot Mac-en vagy a `cd` parancsot Windows-on, hogy megnézd, hol vagy)

## Jó Szórakozást!

Ne feledd: a programozás arról szól, hogy kipróbálsz dolgokat, hibázol és tanulsz. Ne aggódj, ha valami nem működik elsőre - így tanul meg mindenki programozni!

Jó kódolást!
