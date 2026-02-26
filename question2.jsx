import { useEffect, useState } from 'react'

function WhyDoesItAlwaysHappensLikeThis() {
    const [value, setValue] = useState('')

    function updateValue({ target }) {
        setValue(target.value)
    }

    useEffect(() => {
        console.log(value)
    }, [value])

    return (
        <main>
            <h2>
                value&nbsp;=&nbsp;
                <em>{ value || (<i>(empty string)</i>) }</em>
            </h2>

            <p style={{ color: 'var(--black)' }}>
                Не забудь открыть консоль!
            </p>

            <input type="text" value={value} onChange={updateValue} />
        </main>
    )
}

export default WhyDoesItAlwaysHappensLikeThis
