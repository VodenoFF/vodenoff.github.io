import { useState, useEffect } from 'react';
import '../css/terminal.css';
import YouTube from './YouTube';
const asciiArt = `__     __        _                  _____ _____ 
\\ \\   / /__   __| | ___ _ __   ___ |  ___|  ___|
 \\ \\ / / _ \\ / _\` |/ _ \\ '_ \\ / _ \\| |_  | |_   
  \\ V / (_) | (_| |  __/ | | | (_) |  _| | _|  
   \\_/ \\___/ \\__,_|\\___|_| |_|\\___/|_|   |_|  
`;
const Typewriter = (text, delay, func, Spinner, spinTime) => {

  const startTime = new Date();
  let Output = '';
  let index = 0;
  text = Spinner ? "⠋⠙⠹⠸⠼⠴⠦⠧⠇" : text;

  const intervalId = setInterval(() => {

    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        return clearInterval(intervalId)
      }
    });

    const endTime = new Date();
    if (index < text.length) {
      Output += text[index];
      index += 1;

      if (Spinner) {

        func(text[index])
        setTimeout(function () {
          func(text[index + 1])
        }, 700);
        if (index === 8) {
          if (endTime.getTime() - startTime.getTime() < spinTime) {
            index = 0;
          }
          else {
            clearInterval(intervalId)
          }
        }
      }
      else {
        func(Output);
      }
    }
    else {
      return clearInterval(intervalId)
    }
  }
    , delay);

}

function Terminal() {

  const [Text1, setText1] = useState('');
  const [Text2, setText2] = useState('');
  const [Text3, setText3] = useState('');
  const [Text4, setText4] = useState('');
  const cursor = '▮';
  let previousCommand;

  const [prevusedCommand, setprevusedCommand] = useState([])

  function SkipIntro() {
    let id = setTimeout(() => { }, 0);
    while (id--) {
      clearTimeout(id);
    }

    id = setInterval(() => { }, 0);
    while (id--) {
      clearInterval(id);
    }
    setText1("ssh guest@vodenoff.thedev.id")
    setText3("Access Granted!")
  }

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        if (!Text3.includes("Access")) {
          let id = setTimeout(() => { }, 0);
          while (id--) {
            clearTimeout(id);
          }

          id = setInterval(() => { }, 0);
          while (id--) {
            clearInterval(id);
          }
          setText1("ssh guest@vodenoff.thedev.id")
          setText2("guest@vodenoff.thedev.id's password:");
          setText3("Access Granted!")
        }
        const CommandArea = document.getElementById("command");
        if (CommandArea) {
          previousCommand = CommandArea.value
          setprevusedCommand(prevArray => [...prevArray, "guest@vodenoff.thedev.id:~$ " + previousCommand])
          if (CommandArea.value === "github") {
            window.open("https://github.com/VodenoFF", '_blank');
          }
          else if (CommandArea.value === "mysite") {
            window.open("https://vodenoff.thedev.id", '_blank');
          }
          CommandArea.value = "";
        }
      }

    });

    Typewriter("ssh guest@vodenoff.thedev.id", 100, setText1)

    setTimeout(() => {
      setText2("guest@vodenoff.thedev.id's password:▮");
    }, 3000);

    setTimeout(() => {
      Typewriter("", 100, setText4, true, 2500);
    }, 4300);

    setTimeout(() => {
      setText3("Connecting to guest@vodenoff.thedev.id...");
    }, 4300);

    setTimeout(() => {
      setText2("guest@vodenoff.thedev.id's password:");
      setText3("> Access granted.");
    }, 7300);

  }, []);

  return (
    <div className="terminal">
      <div className='console'>
        <span className='userPrefix'>user@localhost:~$
          <span style={{ color: "white", marginLeft: "8px" }}>{Text1}{Text1.length === 20 ? "" : cursor}</span>
        </span>

        {Text3.includes("Access") ? "" : <span id='skipButton' onClick={SkipIntro}>Press Enter or Click Here to Skip</span>}
        {Text2}
        <span> {Text4} <span style={{ color: Text3.includes("Access") ? ("yellow") : "" }} >{Text3}</span></span>
        <br />
        {Text3.includes("Access") ? (
  <pre>
{asciiArt}
  </pre>
) : null}

        {Text3.includes("Access") ? <span>Welcome! this project is currently under development.</span> : ""}
        {Text3.includes("Access") ? <span>What is this? It's a terminal simulation, initially created it as a portfolio <a href="https://vodenoff.thedev.id">(https://vodenoff.thedev.id)</a></span> : ""}<br />
        {Text3.includes("Access") ? <span><span style={{ color: "skyblue" }}>Available Commands:</span></span> : ""}
        {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>General: </span> about, discord, play, clear</span> : ""}
        {Text3.includes("Access") ? <span><span style={{ color: "#c9c9c9" }}>Links:</span> github, portfolio, source</span> : ""}

        <br></br>
        {Text3.includes("Access") ? <span>Thank you for visiting!◝(ᵔᵕᵔ)◜</span> : ""}
        <br></br>
        <ul className='previousCommands' id='console23'>
          {prevusedCommand.map((item, index) => {
            if (item.match(new RegExp(`\\b${"discord"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br>My discord: <span style={{ color: "rgb(68, 110, 250)" }}>@VodenoFF</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"github"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened my GitHub profile in a new tab: https://github.com/VodenoFF</span><br></br><br></br></li>;
            }
            // else if (item.match(new RegExp(`\\b${"projects"}\\b`, 'g'))) {
            //   return <div><li key={index}>{item}</li>
            //     <br></br>  <label for="mcq">Select another project to view:</label>
            //     <div class="mcq-wrapper"><br></br>
            //       <ul id="mcq" class="mcq">
            //         <li class="mcq-option" tabindex="0" data-value="test"><a href="" target='_blank' rel="noreferrer">test ↗</a></li>
            //         <li class="mcq-option" tabindex="1" data-value="test"><a href="" target='_blank' rel="noreferrer">test ↗</a></li>
            //         <li class="mcq-option" tabindex="2" data-value="test"><a href="" target='_blank' rel="noreferrer">test ↗</a></li>
            //         <li class="mcq-option" tabindex="3" data-value="test"><a href="" target='_blank' rel="noreferrer">test ↗</a></li>
            //         <li class="mcq-option" tabindex="4" data-value="test"><a href="" target='_blank' rel="noreferrer">test ↗</a></li>
            //         <li class="mcq-option" tabindex="5" data-value="test"><a href="" target='_blank' rel="noreferrer">test ↗</a></li>
            //         <li class="mcq-option" tabindex="6" data-value="test"><a href="" target='_blank' rel="noreferrer">test ↗</a></li>
            //         <li class="mcq-option" tabindex="7" data-value="test"><a href="" target='_blank' rel="noreferrer">test ↗</a></li><br></br>
            //       </ul>
            //     </div>
            //   </div>
            // }
            else if (item.match(new RegExp(`\\b${"portfolio"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened my personal website in a new tab: https://vodenoff.thedev.id/vodenoff.pdf</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"source"}\\b`, 'g'))) {
              return <li key={index}>{item}<br></br><br></br><span style={{ color: "#c9c9c9" }}>Opened the source code of this site in a new tab: https://github.com/VodenoFF/vodenoff.github.io</span><br></br><br></br></li>;
            }
            else if (item.match(new RegExp(`\\b${"aborthack"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                bash: {item.replace("guest@vodenoff.thedev.id:~$", '')}: ERROR - Script terminated by the user</div>;
            }
            else if (item.match(new RegExp(`\\b${"play"}\\b`, 'g'))) {
              if (item.match(new RegExp(`\\b${"play tech house"}\\b`, 'g')) || item.match(new RegExp(`\\b${"play 1"}\\b`, 'g')) || item.match(new RegExp(`\\b${"play techno"}\\b`, 'g'))) {
                return <div><span style={{color: "hotpink"}}>Now playing:</span> MIX TECH HOUSE
                  <YouTube link={"https://www.youtube.com/embed/RN7mbUBzUJw?si=jdFUAmu5-4CorWnI?autoplay=1"} /></div>
              }
              // else if (item.match(new RegExp(`\\b${"play flower"}\\b`, 'g')) || item.match(new RegExp(`\\b${"play 2"}\\b`, 'g'))) {
              //   return <div><span style={{color: "hotpink"}}>Now playing:</span> JISOO - ‘꽃(FLOWER)’ M/V
              //     <YouTube link={"https://www.youtube.com/embed/YudHcBIxlYw?autoplay=1"} /></div>
              // }
              else {
                return <div><li key={index}>{item}</li><br></br>
                  <span style={{color: "hotpink"}}>Available music:</span><br></br>
                  1. MIX TECH HOUSE<br></br>
                  To play a song, use <strong>play number/songname</strong> (e.g. play 1 or play techno)<br></br><br></br></div>
              }
            }
            else if (item.match(new RegExp(`\\b${"clear"}\\b`, 'g'))) {
              return setprevusedCommand([]);
            }
            else if (item.match(new RegExp(`\\b${"about"}\\b`, 'g'))) {
              return <div><li key={index}>{item}</li>
                <div className='aboutme'><br></br>
                  Hello there! I'm Angel Vodenov, a passionate and versatile freelancer specializing in game development and Linux server management. With a knack for crafting custom scripts and modifications for FiveM servers, I've dedicated myself to enhancing gameplay and delivering exceptional user experiences.
                  <br></br><br></br>
                  My approach is rooted in collaboration, as I work closely with clients to grasp their unique requirements, tailoring solutions that not only meet but exceed their expectations. Through clear communication, responsiveness, and a commitment to reliable service delivery, I cultivate strong and enduring relationships with those I work with.
                  <br></br><br></br>
                  Thorough testing and troubleshooting are second nature to me, ensuring the stability and functionality of every script and server configuration I deploy. Beyond initial setup, I provide ongoing maintenance and support, keeping FiveM servers running smoothly with software updates, performance optimization, and security enhancements.
                  <br></br><br></br>
                  In the realm of Linux-based hosting environments, From server setup and configuration to proactive monitoring and issue resolution, I handle it all with precision and expertise. Whether it's preventing downtime or offering guidance on best practices, I'm dedicated to ensuring my clients' server management needs are met with proficiency and care.
                  <br></br><br></br>
                  Currently, I'm also a student at the University of Library Studies and Information Technologies, diving into the intricacies of Information Security. Despite my academic pursuits, programming remains a joyful hobby—a realm where I unleash creativity and explore new possibilities.
                  <br></br><br></br>
                  At 24 years old, I bring youthful enthusiasm and a commitment to excellence to every project I undertake. So, whether you're seeking to elevate your gaming experience or ensure the smooth operation of your Linux servers, I'm here to bring your vision to life.
                  <br></br><br></br>
                </div>
              </div>
            } else {
              return <div><li key={index}>{item}</li>
                bash: {item.replace("guest@vodenoff.thedev.id:~$", '')}: command not found</div>;
            }
          })}
        </ul>
        {Text3.includes("Access") ? <span className='commands'><span className='userPrefix'>guest@vodenoff.thedev.id:~$</span> <input type="text" id="command" name="command" autoFocus></input></span> : ""}
      </div>
    </div>
  );
}

export default Terminal;
