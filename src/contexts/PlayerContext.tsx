import { createContext, ReactNode, useContext, useState } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

type PlayerContextData = {
  episodeList: Episode[];
  currenteEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  clearPlayerState: () => void;
};

type PlayerContextProviderProps = {
  children: ReactNode;
};

export const PlayerContext = createContext({} as PlayerContextData);

export function PlayerContextProvider({
  children,
}: PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currenteEpisodeIndex, setCurrentEpsodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpsodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list: Episode[], index: number) {
    setEpisodeList(list);
    setCurrentEpsodeIndex(index);
    setIsPlaying(true);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function clearPlayerState() {
      setEpisodeList([]);
      setCurrentEpsodeIndex(0);
  }

  const hasPrevious = currenteEpisodeIndex > 0;
  const hasNext = isShuffling || currenteEpisodeIndex + 1 < episodeList.length;

  function playNext() {
    if (isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
    
        setCurrentEpsodeIndex(nextRandomEpisodeIndex);
    } else if (hasNext) {
      setCurrentEpsodeIndex(currenteEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setCurrentEpsodeIndex(currenteEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        episodeList,
        currenteEpisodeIndex,
        play,
        isPlaying,
        isLooping,
        isShuffling,
        togglePlay,
        toggleLoop,
        toggleShuffle,
        setPlayingState,
        playList,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        clearPlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => {
  return useContext(PlayerContext);
};
