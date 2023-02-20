<template>
    <div>
        <div class="card">
           
            <Chart :type="Type" :data="Data" :options="Options" :width="width" :height="height"  :lable="false" />
        </div>
    </div>
</template>

<script>
import Chart from 'primevue/chart';

export default {
    name:"LineChart",
    components: {Chart},
    props:["Type" ,"Data" , "Options" , "width" , 
    "height"]
}
</script>