import { Link } from "react-router";

function HootListPage(props) {
  return (
    <main>
      {props.hoots.map((hoot) => (
        <Link key={hoot._id} to={`/hoots/${hoot._id}`}>
          <article>
            <header>
              <h2>{hoot.title}</h2>
              <p>
                {`${hoot.author.name} posted on
                ${new Date(hoot.createdAt).toLocaleDateString()}`}
              </p>
            </header>
            <p>{hoot.text}</p>
          </article>
        </Link>
      ))}
    </main>
  );
}

export default HootListPage;
