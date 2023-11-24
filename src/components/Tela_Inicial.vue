<template>
  <div class="hello">
    <h1>Selecione o Empreendimento</h1>

    <select v-model="empreendimentoSelecionado" @change="carregarEmpreendimento">
      <option v-for="empreendimento in empreendimentos" :key="empreendimento.id_empreendimento" :value="empreendimento">
        {{  empreendimento.nome }}
      </option>
    </select>
  </div>
</template>

<script>
import api from './services/api'

export default {
  name:'Tela_Inicial',
  data(){
    return{
      empreendimentos: [],
      empreendimentoSelecionado: null,
      empreendimentoDetalhes: null
    }
  },

  mounted(){
    this.Pegar_Empreendimentos();
  },

  methods:{
    
      Pegar_Empreendimentos(){

        api.get('/empreendimento')
          .then(response => {
            this.empreendimentos = response.data;
            //console.log(this.empreendimentos)
          })
          .catch(error => {
            console.error("Erro ao buscar os empreendimentos", error);
          })    
      },

      carregarEmpreendimento(){
        if(this.empreendimentoSelecionado){

          //Nessa consulta ele ira pegar o empreendimento especifico usando o id do empreendimento
          api.get(`/empreendimento/${this.empreendimentoSelecionado.id_empreendimento}`)
            .then(response => {
              this.empreendimentoDetalhes = response.data;
            })
            .catch(error => {
              console.log('Erro ao carregar detalhes do empreendimento', error);
            });
        }
      }


    }
  }


</script>


<style scoped>

</style>
