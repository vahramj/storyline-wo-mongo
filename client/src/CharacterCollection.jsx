import React from "react";
import Character from "./Character";

import "./styles/CharacterCollection.css";

var characterData;

const CharacterCollection = () => {
	return (
		<div className="character-collection">
			<ul>
				{characterData.map(character => {
					return (
						<li key={character.charId}>
							<Character name={character.name} img={character.img} />
						</li>
					);
				})}
				<li>
					<div id="add-character">
						<div className="large-plus-icon">&#43;</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default CharacterCollection;

characterData = [
	{
		charId: "chr_5",
		name: "Aragorn",
		img: "./static/images/characters_thumbnails/Aragorn_01.png"
	},
	{
		charId: "chr_10",
		name: "Arwen",
		img: "./static/images/characters_thumbnails/arwen_01.png"
	},
	{
		charId: "chr_15",
		name: "Eowyn",
		img: "./static/images/characters_thumbnails/Eowyn_01.png"
	},
	{
		charId: "chr_20",
		name: "Frodo",
		img: "./static/images/characters_thumbnails/frodo_01.png"
	},
	{
		charId: "chr_25",
		name: "Gandalf the gray",
		img: "./static/images/characters_thumbnails/gandalf_01.png"
	},
	{
		charId: "chr_30",
		name: "gollum",
		img: "./static/images/characters_thumbnails/gollum_01.png"
	},
	{
		charId: "chr_35",
		name: "legolas",
		img: "./static/images/characters_thumbnails/legolas_01.png"
	},
	{
		charId: "chr_40",
		name: "samwise gamgee",
		img: "./static/images/characters_thumbnails/sam_01.png"
	},
	{
		charId: "chr_45",
		name: "saruman",
		img: "./static/images/characters_thumbnails/saruman_01.png"
	},	
	{
		charId: "chr_50",
		name: "sauron the terrible",
		img: "./static/images/characters_thumbnails/sauron_01.png"
	},
	{
		charId: "chr_51",
		name: "theoden",
		img: "./static/images/characters_thumbnails/theoden_01.png"
	},
	
];
