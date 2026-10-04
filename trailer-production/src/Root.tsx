import {Composition, Folder} from 'remotion';
import {MeridianTrailer, MapProof} from './Trailer';
import {OpeningScene} from './scenes/OpeningScene';
import {MapScene} from './scenes/MapScene';
import {ClosingScene} from './scenes/ClosingScene';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Proofs">
        <Composition id="OpeningStill" component={OpeningScene} durationInFrames={90} fps={30} width={1920} height={1080}/>
        <Composition id="MapProof" component={MapProof} durationInFrames={150} fps={30} width={1920} height={1080}/>
        <Composition id="FeatureStill" component={MapScene} durationInFrames={210} fps={30} width={1920} height={1080}/>
        <Composition id="ClosingStill" component={ClosingScene} durationInFrames={120} fps={30} width={1920} height={1080}/>
      </Folder>
      <Composition id="MeridianTrailer" component={MeridianTrailer} durationInFrames={960} fps={30} width={1920} height={1080}/>
    </>
  );
};
