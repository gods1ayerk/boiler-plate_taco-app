<template>
  <div>
    <b-jumbotron align="center">
      <template #header>TACO App</template>

      <template #lead>Welcome {{user.name}}</template>

      <div>
        <b-btn variant="primary" v-b-modal.modal-add-recipe-1>Add Recipe</b-btn>
      </div>
    </b-jumbotron>

    <b-modal id="modal-add-recipe-1"
      size="lg"
      title="New Recipe"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      @ok="$root.$emit('bv::show::modal', 'modal-add-recipe-2', $event.target)"
      centered no-stacking>
      <b-form-group
          label="Recipe Name"
          label-for="recipe-name-input"
          invalid-feedback="Name is required">
        <b-form-input
          id="name-input"
          v-model="recipeName"
          required
        ></b-form-input>
      </b-form-group>
    </b-modal>

    <b-modal id="modal-add-recipe-1"
      size="lg"
      title="New Recipe"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      @ok="$root.$emit('bv::show::modal', 'modal-add-recipe-3', $event.target)"
      centered no-stacking>
      <b-form-group v-for="(ingrident, counter) in ingridients" :key="counter"
          :label="'Ingridient '+(counter+1)+' Name'"
          :label-for="'ingridient-'+counter+'-input'"
          invalid-feedback="Name is required">
        <b-form-input
          :id="'ingridient-'+counter+'-input'"
          v-model="ingrident.name"
          required
        ></b-form-input>
      </b-form-group>
      <b-btn @click="addIngridient">Add More</b-btn>
    </b-modal>

    <b-modal id="modal-add-recipe-3"
      size="lg"
      title="New Recipe"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="dark"
      footer-text-variant="light"
      ok-title="Save"
      @ok="saveRecipe"
      centered no-stacking>
      <b-form-group v-for="(step, counter) in steps" :key="counter"
          :label="'Step '+(counter+1)"
          :label-for="'step-'+counter+'-input'"
          invalid-feedback="Step description is required">
        <b-form-input
          :id="'step-'+counter+'-input'"
          v-model="step.name"
          required
        ></b-form-input>
      </b-form-group>
      <b-btn @click="addIngridient">Add Step</b-btn>
    </b-modal>
  </div>
</template>

<script>
import { authService } from '@/_services';

export default {
  name: 'Home',
  data() {
    return {
      user: null,
      recipeName: null,
      ingridients: [{name: ''}],
      steps: [{name: ''}]
    }
  },
  created() {
    authService.user.subscribe(x => this.user = x);
  },
  methods: {
    addIngridient: function() {
      this.ingridients.push({name: ''});
    },
    addStep: function() {
      this.steps.push({name: ''});
    },
    saveRecipe: function() {
      let recipe = {
        name: this.recipeName,
        ingridients: this.ingridients.map(ingridient => ingridient.name),
        steps: this.steps.map(steps => steps.name)
      }
      console.log(recipe);
    }
  }
}
</script>