<template>
  <div class="hello">
    <h1>Selecione o Empreendimento</h1>

    <select v-model="empreendimentoSelecionado" @change="carregarEmpreendimento">
      <option v-for="empreendimento in empreendimentos" :key="empreendimento.id_empreendimento" :value="empreendimento">
        {{  empreendimento.nome }}
      </option>
    </select>

    <div  id="Area_Mapa">
      <img  class="img_mapa"  v-if="empreendimentoDetalhes && Pegar_Imagem()" :src="Pegar_Imagem()" alt="Mapa SVG" />
    </div>

    <div v-if="imoveis.length > 0" >

      <select id="filtroCodImovel" v-model="filtroCodImovel">
        <option value="">Todas as quadras</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="D">D</option>
        <option value="E">E</option>
      </select>
      

      <!-- <select  id="filtroSituacaoImovel" v-model="filtroSituacaoImovel">
        <option value="">Todas as situações</option>
        <option value="1">Vinculado</option>
        <option value="0">Não vinculado</option>
      </select> -->
  

      <h1>Imoveis</h1>
      <table v-for="imovel in ImoveisFiltrados" :key="imovel.id_imovel">
        <tr>
          <td>
            {{ imovel.cod_area }}
          </td>
          <td>
            {{ imovel.id_imovel }}
          </td>
          <td>  
            {{ imovel.cod_imovel }}
          </td>
          <td>
            {{ imovel.situacao === '1' ? 'Vinculado' : 'Não Vinculado' }}
          </td>
        </tr>
      </table>
    </div>
    <p v-else>Nenhum imóvel encontrado.</p>
  </div>
</template>

<script>

import {api_empreendimento, api_imoveis}  from './services/api'

export default {

  name:'Tela_Inicial',
  data(){
    return{
      empreendimentos: [],
      empreendimentoSelecionado: null,
      empreendimentoDetalhes: null,
      imoveis:[],
      filtroCodImovel: "",
      // filtroSituacaoImovel: "",
    }
  },


  computed: {

    ImoveisFiltrados() {
      return this.imoveis.filter(imovel => {
        const filtroCodImovel = this.filtroCodImovel;
        // const filtroSituacaoImovel = this.filtroSituacaoImovel;
        // Aplica os filtros
        return (
          (filtroCodImovel === "" || imovel.cod_area === filtroCodImovel) 
          // (filtroSituacaoImovel === "" || imovel.situacao === filtroSituacaoImovel)
        );
      });
    },
  },

  mounted(){
    this.Pegar_Empreendimentos();
  },

  methods:{

    Pegar_Imagem(){
      if(this.empreendimentoDetalhes) {
        const idEmpreendimento = this.empreendimentoDetalhes.id_empreendimento;

        if (idEmpreendimento) {        
          let nomeArquivo = '';

          switch(idEmpreendimento) {

            case 32:
              nomeArquivo = 'MAPASVG_32.svg';
              break;

            case 35:
              nomeArquivo = 'MAPASVG_35.svg';
              break;  
              
            case 33:
              nomeArquivo = 'MAPASVG_33.svg';
              break; 

            case 36:
              nomeArquivo = 'MAPASVG_36.svg';
              break; 

            case 34:
              nomeArquivo = 'MAPASVG_34.svg';
              break; 

            default:
              break;
              
          }

          if(nomeArquivo){
            const caminho = require(`../assets/img/${nomeArquivo}`);
            console.log(caminho);
            return caminho;
          }
        }
      }
      return null
    },


      Pegar_Empreendimentos(){
        api_empreendimento.get('/empreendimento')
          .then(response => {
            this.empreendimentos = response.data;
          })
          .catch(error => {
            console.error("Erro ao buscar os empreendimentos", error);
          })    
      },

      carregarEmpreendimento(){
        if(this.empreendimentoSelecionado){

          //Nessa consulta ele ira pegar o empreendimento especifico usando o id do empreendimento
          api_empreendimento.get(`/empreendimento/${this.empreendimentoSelecionado.id_empreendimento}`)
            .then(response => {
              this.empreendimentoDetalhes = response.data;

              //console.log(this.empreendimentoDetalhes)
              this.Carregar_Imoveis(this.empreendimentoDetalhes.cod_emp_imob);
            })
            .catch(error => {
              console.log('Erro ao carregar detalhes do empreendimento', error);
            });
        }
      },


      Carregar_Imoveis(codEmpImob){

        api_imoveis.get(`/imoveis/${codEmpImob}/0/0`)
        .then(response => {
          this.imoveis = response.data.Container.imoveis;
          //console.log(this.imoveis)
        })
        .catch(error => {
          console.error("Erro ao buscar os imoveis", error);
        })
      }


    }
  }


</script>


<style scoped>

table{
  border: 1px solid black;
}

.img_mapa{
  width: 30%;
}

</style>
