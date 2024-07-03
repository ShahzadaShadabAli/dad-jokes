import { Col, Container, Row } from "react-bootstrap";
import Jokes from "./Jokes";
import { useEffect, useState } from "react";
import axios from "axios"

const JokesContainer = () => {
    const [jokes, setJoke] = useState([])
    let jokes_arr = []
    const getJokes = async () => {
        for (let i = 1; i<=3; i++) {
            try {
                const res = await axios.get("https://icanhazdadjoke.com/", {
                    headers: { Accept: "application/json" },
                  });
                jokes_arr.push({...res.data, votes: 0})
            } catch (error) {
                console.log(error.message)
            }
        }
        setJoke(jokes_arr)
    }
    useEffect(() => {
        getJokes()
    }, [])
    const handleVote = (id, val) => {
        let given_joke = jokes.find(j => j.id === id)
        given_joke.votes += val
        const other_than_given_joke = jokes.filter(j => j.id !== id)
        other_than_given_joke.push(given_joke)
        other_than_given_joke.sort((a, b) => b.votes - a.votes);
        setJoke(other_than_given_joke)
    }
    return (
        <Container>
            <Row className="the-row" style={{ width: 1000, height: 500 }}>
                <Col md={4} className="title-section bg-light">
                    <div>
                        <h1>Dad Jokes</h1>
                        <p className="text-center" style={{ fontSize: 70 }}>😂</p>
                    </div>
                </Col>
                <Col md={8} className="jokes-section bg-primary">
                {jokes && jokes.map(joke => (
                    <Jokes joke={joke} upvote={() => handleVote(joke.id, 1)} downvote={() => handleVote(joke.id, -1)} />
                ))}
                </Col>
            </Row>
        </Container>
    );
}

export default JokesContainer;