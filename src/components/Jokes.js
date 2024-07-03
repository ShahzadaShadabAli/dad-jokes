const Jokes = ({ joke, upvote, downvote }) => {
    let emoji = ''
    if (joke.votes >= 8) {
        emoji = "🤣"
    } else if (joke.votes >= 4) {
        emoji = "😂"
    } else if (joke.votes >= 0) {
        emoji = "😐"
    } else {
        emoji = "🙁"
    }

    return (
        <div key={joke.id} className="joke-ribbon p-2 text-light">
            <div className="left-side">
                <i class="fa-solid fa-up-long" onClick={upvote}></i>
                <p className="votes mb-0">{joke.votes}</p>
                <i class="fa-solid fa-down-long" onClick={downvote}></i>
            </div>
            <div className="middle-side">
                {joke.joke}
            </div>
            <div className="right-side" style={{ fontSize: 60 }}>
                {emoji}
            </div>
        </div>
    );
}

export default Jokes;