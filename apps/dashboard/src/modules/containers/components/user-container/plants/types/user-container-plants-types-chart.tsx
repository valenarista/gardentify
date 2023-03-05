import PieChart from '@modules/charts/components/pie-chart';
import { Plant } from '@modules/graphql/@generated/graphql';
import { generatePlantColors } from '@modules/plants/lib/plant-utils';
import { useThemeContext } from '@modules/theme/context/theme-context';
import React from 'react';

type UserContainerPlantsTypesChartProps = {
  containerPlants: Plant[];
};

const UserContainerPlantsTypesChart: React.FC<UserContainerPlantsTypesChartProps> = (props) => {
  const { containerPlants } = props;
  const { theme } = useThemeContext();

  const sortedPlants = [...containerPlants].sort((a, b) => (a.type.valueOf() > b.type.valueOf() ? 1 : -1));

  const plantTypes = sortedPlants.reduce<{ [key: string]: number }>((counts, plant) => {
    if (plant.type in counts) {
      counts[plant.type]++;
    } else {
      counts[plant.type] = 1;
    }
    return counts;
  }, {});

  const plantTypesOccurrences = Object.values(plantTypes);
  const plantTypesLabels = Object.keys(plantTypes).map((type) => type.toLocaleLowerCase());

  return (
    <>
      {containerPlants.length === 1 ? (
        <p>Not enough plants to calculate data!</p>
      ) : (
        <>
          <p className="mb-2">See the plant growth performance in the chart below.</p>
          <PieChart
            title="Plant Types"
            labels={plantTypesLabels}
            data={plantTypesOccurrences}
            tooltipFormat={(value) => `${value} plants`}
            animate
            colors={{
              backgrounds: Object.values(generatePlantColors(theme, 0.5)),
              borders: Object.values(generatePlantColors(theme, 1)),
            }}
          />
        </>
      )}
    </>
  );
};

export default UserContainerPlantsTypesChart;
