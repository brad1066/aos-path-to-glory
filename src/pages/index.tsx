import { gql, useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { client } from '~/apollo-client'

const QUERY = gql`
  query {
    grandAlliances {
      allianceId: id
      name
      factions {
        factionId: id
        name
        subfactions {
          subfactionId: id
          name
        }
        warlords {
          warlordId: id
          name
        }
        heroes {
          heroId: id
          name
        }
        units {
          unitId: id
          name
        }
      }
    }
  }
`

export default function Home() {
  const { loading, data, error } = useQuery(QUERY, { client })
  useEffect(() => {
    console.dir(data)
  }, [data])

  console.log('hello ')
  console.log('world')

  if (loading) {
    return <h1>Loading</h1>
  }
  if (data) {
    return (
      <>
        {data?.grandAlliances &&
          data.grandAlliances.map((alliance) => (
            <div key={'alliance_' + alliance.allianceId}>
              <h2>{alliance.name}</h2>
              {alliance.factions &&
                alliance.factions?.map((faction) => (
                  <div key={'faction_' + faction.factionId} style={{marginLeft: '1rem'}}>
                    <h3>{faction.name}</h3>
                    <ul style={{marginLeft: '1rem'}}>
                      {faction.units &&
                        faction.units?.map((unit) => (
                          <li key={'unit_' + unit.unitId}>{unit.name}</li>
                        ))}
                      {faction.heroes &&
                        faction.heroes?.map((hero) => (
                          <li key={'hero_' + hero.heroId}>{hero.name}</li>
                        ))}
                      {faction.warlords &&
                        faction.warlords?.map((warlords) => (
                          <li key={'warlord_' + warlords.heroId}>
                            {warlords.name}
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
            </div>
          ))}
      </>
    )
  }
}
