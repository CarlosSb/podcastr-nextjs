import { GetStaticProps } from "next";
import { api } from "../services/api";

type Episode = {
  id: string;
  title: string;
  members: string;
  published_at: string;
  thumbnail: string;
  decription: string;
  file: {
    url: string;
    type: string;
    duration: number;
  };
};

type HomeProps = {
  episodes: Episode[];
};

export default function Home(props: HomeProps) {
  return (
    <div>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const episodes = await api.get("episodes", {
      params: {
        _limit: 12,
        _sort: "published_at",
        _order: "desc",
      },
    })
    .then((response) => response.data);

  return {
    props: {
      episodes,
    },
    revalidate: 60 * 60 * 8,
  };
};
