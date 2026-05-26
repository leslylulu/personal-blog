import { useState } from "preact/hooks";

interface GreetingProps {
	messages: string[];
}

export default function Greeting({ messages }: GreetingProps) {

	const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

	const [greeting, setGreeting] = useState(messages[0]);

	return (
		<div>
			<h3 class="text-lg font-semibold my-4">{greeting}! Thank you for visiting!</h3>
			<button 
				onClick={() => setGreeting(randomMessage())}
				class="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors font-semibold"
			>
				New Greeting
			</button>
		</div>
	);
}