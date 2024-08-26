import React from "react";

import Typewriter from 'typewriter-effect';

function TextAnimation() {
    return (
        <div>
            <h1 className="text-4xl font-bold text-white">
            Muito além da fisioterapia...
            </h1>
            <p className="inline-block bg-evolutiGolden text-4xl rounded-xl p-3 font-extrabold">
            <Typewriter
                options={{
                    strings: ['<span class="font-bold">a autonomia</span>', 
                    '<span class="font-bold">o cuidado</span>', 
                    '<span class="font-bold">a organização</span>'
                ],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                }}
                />
            </p>

        </div>
    )
}

export default TextAnimation;