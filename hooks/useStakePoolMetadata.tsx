import { StakePoolMetadata, stakePoolMetadatas } from 'api/mapping'
import { useQuery } from 'react-query'
import { useStakePoolId } from './useStakePoolId'

export const useStakePoolMetadata = () => {
  const stakePoolId = useStakePoolId()
  return useQuery<StakePoolMetadata | undefined>(
    ['useStakePoolMetadata', stakePoolId?.toString()],
    async () => {
      if (!stakePoolId) return;

      const f = await fetch(`http://localhost:5001/api/staking/${stakePoolId.toBase58()}`).then(res => {
        return res.json();
      });

      // f = {
      //   ...f,
      //   colors: {
      //     primary: 'rgb(100,21,38,0.9)',
      //     secondary: 'rgb(157,120,138, 0.6)',
      //   },
      // }

      // console.log(f);

      return f;
    }
  )
}
